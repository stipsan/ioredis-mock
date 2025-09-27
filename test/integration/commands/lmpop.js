import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lmpop', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    beforeEach(async () => {
      await redis.flushall()
    })

    // Helper function to normalize LMPOP result for buffer/string variants
    const normalizeResult = (result) => {
      if (result === null) return null
      const [key, elements] = result
      return [
        Buffer.isBuffer(key) ? key.toString() : key,
        elements.map(v => Buffer.isBuffer(v) ? v.toString() : v),
      ]
    }

    it('should pop from the first non-empty list using LEFT direction', async () => {
      await redis.rpush('empty', 'should_not_be_here')
      await redis.del('empty') // Make it empty
      await redis.rpush('list1', 'a', 'b', 'c')
      await redis.rpush('list2', '1', '2', '3')

      const result = await redis[command](3, 'empty', 'list1', 'list2', 'LEFT')
      expect(normalizeResult(result)).toEqual(['list1', ['a']])
      
      const remaining = await redis.lrange('list1', 0, -1)
      expect(remaining.map(v => Buffer.isBuffer(v) ? v.toString() : v)).toEqual(['b', 'c'])
    })

    it('should pop from the first non-empty list using RIGHT direction', async () => {
      await redis.rpush('list1', 'a', 'b', 'c')
      await redis.rpush('list2', '1', '2', '3')

      const result = await redis[command](2, 'list1', 'list2', 'RIGHT')
      expect(normalizeResult(result)).toEqual(['list1', ['c']])
      
      const remaining = await redis.lrange('list1', 0, -1)
      expect(remaining.map(v => Buffer.isBuffer(v) ? v.toString() : v)).toEqual(['a', 'b'])
    })

    it('should pop multiple elements with COUNT parameter', async () => {
      await redis.rpush('list1', 'a', 'b', 'c', 'd', 'e')

      const result = await redis[command](1, 'list1', 'LEFT', 'COUNT', 3)
      expect(normalizeResult(result)).toEqual(['list1', ['a', 'b', 'c']])
      
      const remaining = await redis.lrange('list1', 0, -1)
      expect(remaining.map(v => Buffer.isBuffer(v) ? v.toString() : v)).toEqual(['d', 'e'])
    })

    it('should pop all elements if COUNT is larger than list size', async () => {
      await redis.rpush('list1', 'x', 'y')

      const result = await redis[command](1, 'list1', 'RIGHT', 'COUNT', 5)
      
      expect(normalizeResult(result)).toEqual(['list1', ['y', 'x']])
      
      // List should be deleted when empty
      expect(await redis.exists('list1')).toBe(0)
    })

    it('should return null when all lists are empty', async () => {
      // Create and then empty a list
      await redis.rpush('list1', 'a')
      await redis.lpop('list1') // Remove the element to make it empty
      
      // list2 is non-existent, so it's empty

      const result = await redis[command](2, 'list1', 'list2', 'LEFT')
      
      expect(result).toBe(null)
    })

    it('should return null when no lists exist', async () => {
      const result = await redis[command](2, 'nonexistent1', 'nonexistent2', 'LEFT')
      
      expect(result).toBe(null)
    })

    it('should skip empty lists and pop from first non-empty', async () => {
      await redis.rpush('list2', 'first', 'second')
      // list1 doesn't exist, list3 doesn't exist - list2 has elements

      const result = await redis[command](3, 'list1', 'list2', 'list3', 'LEFT')
      
      expect(normalizeResult(result)).toEqual(['list2', ['first']])
      
      const remaining = await redis.lrange('list2', 0, -1)
      expect(remaining).toEqual(['second'])
    })

    it('should delete key when list becomes empty', async () => {
      await redis.rpush('list1', 'only')

      const result = await redis[command](1, 'list1', 'LEFT')
      
      expect(normalizeResult(result)).toEqual(['list1', ['only']])
      expect(await redis.exists('list1')).toBe(0)
    })

    it('should handle case-insensitive direction', async () => {
      await redis.rpush('list1', 'a', 'b')

      const result1 = await redis[command](1, 'list1', 'left')
      expect(normalizeResult(result1)).toEqual(['list1', ['a']])

      const result2 = await redis[command](1, 'list1', 'Right')
      expect(normalizeResult(result2)).toEqual(['list1', ['b']])
    })

    it('should throw error for invalid numkeys', async () => {
      await expect(
        redis[command](0, 'list1', 'LEFT')
      ).rejects.toThrow('ERR numkeys should be greater than 0')

      await expect(
        redis[command](-1, 'list1', 'LEFT')
      ).rejects.toThrow('ERR numkeys should be greater than 0')

      await expect(
        redis[command]('invalid', 'list1', 'LEFT')
      ).rejects.toThrow('ERR numkeys should be greater than 0')
    })

    it('should throw error for invalid direction', async () => {
      await expect(
        redis[command](1, 'list1', 'INVALID')
      ).rejects.toThrow('ERR syntax error')

      await expect(
        redis[command](1, 'list1', 'UP')
      ).rejects.toThrow('ERR syntax error')
    })

    it('should throw error for wrong number of arguments', async () => {
      await expect(
        redis[command]()
      ).rejects.toThrow('ERR wrong number of arguments for \'lmpop\' command')

      await expect(
        redis[command](1)
      ).rejects.toThrow('ERR wrong number of arguments for \'lmpop\' command')

      await expect(
        redis[command](1, 'list1')
      ).rejects.toThrow('ERR wrong number of arguments for \'lmpop\' command')
    })

    it('should throw error for invalid COUNT', async () => {
      await expect(
        redis[command](1, 'list1', 'LEFT', 'COUNT', 0)
      ).rejects.toThrow('ERR count should be greater than 0')

      await expect(
        redis[command](1, 'list1', 'LEFT', 'COUNT', -1)
      ).rejects.toThrow('ERR count should be greater than 0')

      await expect(
        redis[command](1, 'list1', 'LEFT', 'COUNT', 'invalid')
      ).rejects.toThrow('ERR count should be greater than 0')
    })

    it('should throw error for wrong COUNT syntax', async () => {
      await expect(
        redis[command](1, 'list1', 'LEFT', 'COUNT')
      ).rejects.toThrow('ERR syntax error')

      await expect(
        redis[command](1, 'list1', 'LEFT', 'INVALID', '1')
      ).rejects.toThrow('ERR syntax error')

      await expect(
        redis[command](1, 'list1', 'LEFT', 'COUNT', '1', 'extra')
      ).rejects.toThrow('ERR syntax error')
    })

    it('should throw error for non-list key', async () => {
      await redis.set('string_key', 'hello')
      await redis.sadd('set_key', 'member')
      await redis.hset('hash_key', 'field', 'value')

      await expect(
        redis[command](1, 'string_key', 'LEFT')
      ).rejects.toThrow('WRONGTYPE Operation against a key holding the wrong kind of value')

      await expect(
        redis[command](2, 'set_key', 'list', 'LEFT')
      ).rejects.toThrow('WRONGTYPE Operation against a key holding the wrong kind of value')

      await expect(
        redis[command](3, 'list', 'hash_key', 'other', 'LEFT')
      ).rejects.toThrow('WRONGTYPE Operation against a key holding the wrong kind of value')
    })

    it('should work with mixed empty and non-empty lists', async () => {
      // Make list1 empty, list2 non-empty, list3 doesn't exist
      await redis.rpush('list2', 'a', 'b', 'c')

      const result = await redis[command](3, 'list1', 'list2', 'list3', 'RIGHT', 'COUNT', 2)
      
      expect(normalizeResult(result)).toEqual(['list2', ['c', 'b']])
      
      const remaining = await redis.lrange('list2', 0, -1)
      expect(remaining).toEqual(['a'])
    })

    it('should handle large COUNT values gracefully', async () => {
      await redis.rpush('list1', 'a', 'b')

      const result = await redis[command](1, 'list1', 'LEFT', 'COUNT', 1000)
      
      expect(normalizeResult(result)).toEqual(['list1', ['a', 'b']])
      expect(await redis.exists('list1')).toBe(0)
    })

    // Test edge case with exact key count
    it('should work when numkeys matches number of provided keys', async () => {
      await redis.rpush('list1', 'a')
      await redis.rpush('list2', 'b')

      const result = await redis[command](2, 'list1', 'list2', 'LEFT')
      
      expect(normalizeResult(result)).toEqual(['list1', ['a']])
    })

    // Test buffer variant if available
    it('should support buffer operations', async () => {
      await redis.rpush('list1', 'hello', 'world')

      if (typeof redis[`${command}Buffer`] === 'function') {
        const result = await redis[`${command}Buffer`](1, 'list1', 'LEFT')
        expect(result).toBeInstanceOf(Array)
        expect(Buffer.isBuffer(result[0])).toBe(true)
        expect(result[0].toString()).toBe('list1')
        expect(result[1]).toBeInstanceOf(Array)
        expect(Buffer.isBuffer(result[1][0])).toBe(true)
        expect(result[1][0].toString()).toBe('hello')
      }
    })
  })
})
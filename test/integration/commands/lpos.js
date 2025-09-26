import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lpos', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    beforeEach(async () => {
      await redis.flushall()
    })

    it('should return the position of the first occurrence', async () => {
      await redis.lpush('mylist', 'c', 'b', 'a', 'b')
      // List is now: ['b', 'a', 'b', 'c']
      
      const pos = await redis[command]('mylist', 'b')
      expect(pos).toBe(0)
    })

    it('should return null when element is not found', async () => {
      await redis.lpush('mylist', 'c', 'b', 'a')
      
      const pos = await redis[command]('mylist', 'x')
      expect(pos).toBe(null)
    })

    it('should return null for non-existent key', async () => {
      const pos = await redis[command]('nonexistent', 'a')
      expect(pos).toBe(null)
    })

    it('should work with RANK parameter to find nth occurrence', async () => {
      await redis.lpush('mylist', 'd', 'c', 'b', 'a', 'b', 'a')
      // List is now: ['a', 'b', 'a', 'b', 'c', 'd']
      
      const pos1 = await redis[command]('mylist', 'b', 'RANK', 1)
      expect(pos1).toBe(1)
      
      const pos2 = await redis[command]('mylist', 'b', 'RANK', 2)
      expect(pos2).toBe(3)
    })

    it('should work with negative RANK parameter', async () => {
      await redis.lpush('mylist', 'd', 'c', 'b', 'a', 'b', 'a')
      // List is now: ['a', 'b', 'a', 'b', 'c', 'd']
      
      const pos = await redis[command]('mylist', 'b', 'RANK', -1)
      expect(pos).toBe(3) // last occurrence
      
      const pos2 = await redis[command]('mylist', 'b', 'RANK', -2)
      expect(pos2).toBe(1) // second to last occurrence
    })

    it('should return null when RANK exceeds occurrences', async () => {
      await redis.lpush('mylist', 'c', 'b', 'a')
      
      const pos = await redis[command]('mylist', 'b', 'RANK', 2)
      expect(pos).toBe(null)
    })

    it('should work with COUNT parameter', async () => {
      await redis.lpush('mylist', 'd', 'c', 'b', 'a', 'b', 'a')
      // List is now: ['a', 'b', 'a', 'b', 'c', 'd']
      
      const positions = await redis[command]('mylist', 'a', 'COUNT', 2)
      expect(positions).toEqual([0, 2])
    })

    it('should return all positions with COUNT 0', async () => {
      await redis.lpush('mylist', 'd', 'c', 'b', 'a', 'b', 'a')
      // List is now: ['a', 'b', 'a', 'b', 'c', 'd']
      
      const positions = await redis[command]('mylist', 'b', 'COUNT', 0)
      expect(positions).toEqual([1, 3])
    })

    it('should work with MAXLEN parameter', async () => {
      await redis.lpush('mylist', 'e', 'd', 'c', 'b', 'a')
      // List is now: ['a', 'b', 'c', 'd', 'e']
      
      const pos = await redis[command]('mylist', 'd', 'MAXLEN', 3)
      expect(pos).toBe(null) // 'd' is at position 3, but we only search first 3 elements
      
      const pos2 = await redis[command]('mylist', 'c', 'MAXLEN', 3)
      expect(pos2).toBe(2) // 'c' is at position 2, within first 3 elements
    })

    it('should work with combined RANK and COUNT', async () => {
      await redis.lpush('mylist', 'e', 'd', 'c', 'b', 'a', 'b', 'a')
      // List is now: ['a', 'b', 'a', 'b', 'c', 'd', 'e']
      
      const positions = await redis[command]('mylist', 'a', 'RANK', 2, 'COUNT', 1)
      expect(positions).toEqual([2]) // second occurrence of 'a'
    })

    it('should return empty array when COUNT specified but no matches', async () => {
      await redis.lpush('mylist', 'c', 'b', 'a')
      
      const positions = await redis[command]('mylist', 'x', 'COUNT', 2)
      expect(positions).toEqual([])
    })

    it('should throw error for invalid RANK', async () => {
      await redis.lpush('mylist', 'a')
      
      await expect(redis[command]('mylist', 'a', 'RANK', 0))
        .rejects.toThrow('ERR RANK can\'t be zero')
    })

    it('should throw error for negative COUNT', async () => {
      await redis.lpush('mylist', 'a')
      
      await expect(redis[command]('mylist', 'a', 'COUNT', -1))
        .rejects.toThrow('ERR COUNT can\'t be negative')
    })

    it('should throw error for negative MAXLEN', async () => {
      await redis.lpush('mylist', 'a')
      
      await expect(redis[command]('mylist', 'a', 'MAXLEN', -1))
        .rejects.toThrow('ERR MAXLEN can\'t be negative')
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if the key contains something other than a list',
      async () => {
        await redis.set('foo', 'not a list')

        await expect(redis[command]('foo', 'a'))
          .rejects.toThrow('Key foo does not contain a list')
      }
    )
  })
})
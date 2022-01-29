import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('brpoplpush', (command, equals) => {
  describe(command, () => {
    it('should remove one item from the tail of the source list', async () => {
      const redis = new Redis()
      await redis.rpush('foo', 'foo', 'bar')

      await redis[command]('foo', 'bar', 1)
      expect(await redis.lrange('foo', 0, -1)).toEqual(['foo'])
      redis.disconnect()
    })

    it('should add one item to the head of the destination list', async () => {
      const redis = new Redis()
      await redis.rpush('foo', 'foo', 'bar')
      await redis.rpush('bar', 'baz')

      await redis[command]('foo', 'bar', 1)
      expect(await redis.lrange('bar', 0, -1)).toEqual(['bar', 'baz'])
      redis.disconnect()
    })

    it('should return null if the source list does not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('foo', 'bar', 1)).toEqual(null)
      redis.disconnect()
    })

    it('should return null if the source list is empty', async () => {
      const redis = new Redis({ data: { foo: [] } })

      expect(await redis[command]('foo', 'bar', 1)).toEqual(null)
      redis.disconnect()
    })

    it('should return the item', async () => {
      const redis = new Redis()
      await redis.rpush('foo', 'foo', 'bar')

      expect(equals(await redis[command]('foo', 'bar', 1), 'bar')).toBe(true)
      redis.disconnect()
    })

    it.skip('should return buffer values correctly', async () => {
      const bufferVal = Buffer.from('bar')
      const redis = new Redis()
      await redis.rpush('foo', 'foo', bufferVal)
      const result = await redis[command]('foo', bufferVal, 1)
      expect(equals(result, 'bar')).toBe(true)
      redis.disconnect()
    })

    it('should throw an exception if the source key contains something other than a list', async () => {
      const redis = new Redis()
      await redis.set('foo', 'not a list')

      await expect(() => {
        return redis[command]('foo', 'bar', 1)
      }).rejects.toThrowErrorMatchingInlineSnapshot(
        '"WRONGTYPE Operation against a key holding the wrong kind of value"'
      )
      redis.disconnect()
    })

    it('should resolve to null if the destination key contains something other than a list', async () => {
      const redis = new Redis()
      await redis.set('bar', 'not a list')

      expect(await redis[command]('foo', 'bar', 1)).toBe(null)
      redis.disconnect()
    })
  })
})

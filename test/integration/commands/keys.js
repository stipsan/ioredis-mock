import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('keys', (command, equals) => {
  describe(command, () => {
    it('should return an empty array if there are no keys', async () => {
      const redis = new Redis()

      expect(await redis[command]('*')).toEqual([])
      redis.disconnect()
    })

    it('should return all data keys', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')
      await redis.set('baz', 'quux')

      const keys = (await redis[command]('*')).sort()
      expect(equals(keys[0], 'baz')).toBe(true)
      expect(equals(keys[1], 'foo')).toBe(true)
      redis.disconnect()
    })

    it('should only return keys matching the given pattern', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')
      await redis.set('baz', 'quux')
      await redis.set('flambé', 'baked alaska')

      const keys = (await redis[command]('f*')).sort()
      expect(equals(keys[0], 'flambé')).toBe(true)
      expect(equals(keys[1], 'foo')).toBe(true)
      redis.disconnect()
    })

    it('should not return empty sets', async () => {
      const redis = new Redis()
      await redis.sadd('a', 'b')
      await redis.srem('a', 'b')

      expect(await redis[command]('*')).toEqual([])
      redis.disconnect()
    })
  })
})

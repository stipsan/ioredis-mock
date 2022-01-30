import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('persist', command => {
  describe(command, () => {
    it('should remove expire status on key', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')
      await redis.expire('foo', 1)

      expect(await redis.persist('foo')).toBe(1)
      expect(await redis.ttl('foo')).toBe(-1)

      redis.disconnect()
    })

    it('should return 0 if key does not have expire status', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')

      expect(await redis.persist('foo')).toBe(0)
      expect(await redis.ttl('foo')).toBe(-1)

      redis.disconnect()
    })

    it('should return 0 if key does not exist', async () => {
      const redis = new Redis()

      expect(await redis.persist('foo')).toBe(0)
      expect(await redis.ttl('foo')).toBe(-2)

      redis.disconnect()
    })
  })
})

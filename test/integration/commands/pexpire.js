import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('pexpire', command => {
  describe(command, () => {
    let redis

    afterEach(() => {
      if (redis) {
        redis.disconnect()
        redis = null
      }
    })

    it('should set expire status on key', async () => {
      redis = new Redis()
      await redis.set('foo', 'bar')

      expect(await redis[command]('foo', 100)).toBe(1)
      expect(await redis.pttl('foo')).toBeGreaterThanOrEqual(1)

      await new Promise(resolve => setTimeout(resolve, 200))

      expect(await redis.get('foo')).toBe(null)
    })

    it('should return 0 if key does not exist', async () => {
      redis = new Redis()
      expect(await redis[command]('foo', 100)).toBe(0)
    })
  })
})

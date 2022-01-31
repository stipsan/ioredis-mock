import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('expireat', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should set expire status on key', async () => {
      await redis.set('foo', 'bar')
      const at = Math.ceil(Date.now() / 1000) + 1

      expect(await redis[command]('foo', at)).toBe(1)
      expect(await redis.ttl('foo')).toBeGreaterThanOrEqual(1)
    })

    it('should return 0 if key does not exist', async () => {
      const at = Math.ceil(Date.now() / 1000)
      expect(await redis[command]('foo', at)).toBe(0)
    })
  })
})

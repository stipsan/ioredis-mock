import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('pexpireat', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should set expire status on key', async () => {
      await redis.set('foo', 'bar')
      const at = Date.now() + 100

      expect(await redis[command]('foo', at)).toBe(1)
      expect(await redis.pttl('foo')).toBeGreaterThanOrEqual(1)

      await new Promise(resolve => setTimeout(resolve, 200))

      expect(await redis.get('foo')).toBe(null)
    })

    it('should return 0 if key does not exist', async () => {
      const at = Date.now()
      expect(await redis[command]('foo', at)).toBe(0)
    })
  })
})

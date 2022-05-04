import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('pexpire', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should set expire status on key', async () => {
      await redis.set('foo', 'bar')

      expect(await redis[command]('foo', 100)).toBe(1)
      expect(await redis.pttl('foo')).toBeGreaterThanOrEqual(1)

      await new Promise(resolve => setTimeout(resolve, 200))

      expect(await redis.get('foo')).toBe(null)
    })

    it('should return 0 if key does not exist', async () => {
      expect(await redis[command]('foo', 100)).toBe(0)
    })
  })
})

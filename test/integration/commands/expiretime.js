import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('expiretime', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return Unix timestamp of which the key expires', async () => {
      const at = Math.ceil(Date.now() / 1000) + 1
      await redis.set('foo', 'bar')
      await redis.expireat('foo', at)

      expect(await redis[command]('foo')).toBe(at)
    })

    it('should return -1 if key exists but no expiration time attached', async () => {
      await redis.set('foo', 'bar')
      expect(await redis[command]('foo')).toBe(-1)
    })

    it('should return -2 if key does not exist', async () => {
      expect(await redis[command]('foo')).toBe(-2)
    })
  })
})

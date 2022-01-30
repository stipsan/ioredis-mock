import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('randomkey', command => {
  describe(command, () => {
    it('should return a random key', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')
      await redis.set('bar', 'foo')

      const result = await redis[command]()
      expect(['foo', 'bar']).toContain(
        Buffer.isBuffer(result) ? result.toString() : result
      )

      redis.disconnect()
    })

    it('should return null if db is empty', async () => {
      const redis = new Redis()

      expect(await redis[command]()).toBe(null)

      redis.disconnect()
    })
  })
})

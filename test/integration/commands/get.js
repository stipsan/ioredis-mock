import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('get', (command, equals) => {
  describe(command, () => {
    it('should return null on keys that do not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('foo')).toBe(null)
      redis.disconnect()
    })

    it('should return value of key', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')

      expect(equals(await redis[command]('foo'), 'bar')).toBe(true)
      redis.disconnect()
    })
  })
})

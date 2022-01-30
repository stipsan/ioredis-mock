import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('mget', (command, equals) => {
  describe(command, () => {
    it('should return null on keys that do not exist', async () => {
      const redis = new Redis()

      const result = await redis[command]('foo')
      expect(result[0]).toBe(null)

      redis.disconnect()
    })

    it('should return value keys that exist', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')

      const result = await redis[command]('foo', 'hello')
      expect(equals(result[0], 'bar')).toBe(true)
      expect(result[1]).toBe(null)

      redis.disconnect()
    })
  })
})

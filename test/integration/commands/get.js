import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import {runTwinSuite} from '../../../test-utils'

runTwinSuite('get', (command, equals, cast) => {
  describe(command, () => {
    it('should return null on keys that do not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('foo')).toBe(null)
      redis.disconnect()
    })

    it('should return value of key', async () => {
      const redis = new Redis()
      const value = cast('bar')
      await redis.set('foo', value)

      expect(equals(await redis[command]('foo'), value)).toBe(true)
      redis.disconnect()
    })
  })
})
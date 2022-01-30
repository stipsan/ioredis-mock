import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('strlen', command => {
  describe(command, () => {
    it('should return 0 on keys that do not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('nonexisting')).toBe(0)

      redis.disconnect()
    })

    it('should return string length of keys that do exist', async () => {
      const redis = new Redis({
        data: {
          mykey: 'Hello world',
        },
      })
      await redis.set('mykey', 'Hello world')

      expect(await redis[command]('mykey')).toBe(11)

      redis.disconnect()
    })
  })
})

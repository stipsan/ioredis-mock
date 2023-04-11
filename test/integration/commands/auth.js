import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('auth', (command, equals) => {
  describe(command, () => {
    it('should return OK or ReplyError', async () => {
      const redis = new Redis()
      expect.assertions(1)

      try {
        expect(equals(await redis[command]('123456'), 'OK')).toBe(true)
      } catch (err) {
        expect(err.name).toBe('ReplyError')
      }
      redis.disconnect()
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('echo', (command, equals) => {
  describe(command, () => {
    it('should return message', async () => {
      const redis = new Redis()

      expect(equals(await redis[command]('Hello World!'), 'Hello World!')).toBe(
        true
      )
      redis.disconnect()
    })
  })
})

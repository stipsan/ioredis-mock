import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('bgsave', (command, equals) => {
  describe(command, () => {
    it('should return a message', async () => {
      const redis = new Redis()

      try {
        expect(
          equals(await redis[command](), 'Background saving started')
        ).toBe(true)
      } catch (error) {
        expect(error.message).toMatch('Background save already in progress')
      }
      redis.disconnect()
    })
  })
})

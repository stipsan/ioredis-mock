import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('asking', command => {
  describe(command, () => {
    it('should throw an error when cluster support is disabled', async () => {
      const redis = new Redis()
      expect.hasAssertions()

      try {
        await redis[command]()
      } catch (err) {
        expect(err.message).toBe(
          'ERR This instance has cluster support disabled'
        )
      }

      redis.disconnect()
    })
  })
})

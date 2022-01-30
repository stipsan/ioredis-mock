import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('cluster', command => {
  describe(command, () => {
    it('should throw an error when wrong number of arguments', async () => {
      const redis = new Redis()
      expect.hasAssertions()

      try {
        await redis[command]()
      } catch (err) {
        expect(err.message).toBe(
          "ERR wrong number of arguments for 'cluster' command"
        )
      }

      redis.disconnect()
    })

    it('should throw an error when cluster support is disabled', async () => {
      const redis = new Redis()
      expect.hasAssertions()

      try {
        await redis[command]('help')
      } catch (err) {
        expect(err.message).toBe(
          'ERR This instance has cluster support disabled'
        )
      }

      redis.disconnect()
    })
  })
})

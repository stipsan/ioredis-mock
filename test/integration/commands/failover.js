import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('failover', command => {
  describe(command, () => {
    it('should throw an error when no replicas are connected', async () => {
      const redis = new Redis()
      expect.hasAssertions()

      try {
        await redis[command]()
      } catch (err) {
        expect(err.message).toBe('ERR FAILOVER requires connected replicas.')
      }

      redis.disconnect()
    })
  })
})

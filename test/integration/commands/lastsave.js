import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lastsave', command => {
  describe(command, () => {
    it('should return unix time since last save', async () => {
      const redis = new Redis()

      expect(await redis[command]()).toBeLessThanOrEqual(
        Math.floor(new Date().getTime() / 1000)
      )
      redis.disconnect()
    })
  })
})

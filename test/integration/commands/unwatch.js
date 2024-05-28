import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('unwatch', (command, equals) => {
  describe(command, () => {
    let redis

    beforeEach(() => {
      redis = new Redis()
    })

    afterEach(() => {
      redis.disconnect()
    })

    it('should return OK', async () => {
      expect(equals(await redis[command](), 'OK')).toBe(true)
    })
  })
})

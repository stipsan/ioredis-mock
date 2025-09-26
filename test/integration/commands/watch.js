import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('watch', (command, equals) => {
  describe(command, () => {
    let redis

    beforeEach(() => {
      redis = new Redis()
    })

    afterEach(() => {
      redis.disconnect()
    })

    it('should return OK', async () => {
      expect(equals(await redis[command]('foo', 'bar'), 'OK')).toBe(true)
    })
  })
})

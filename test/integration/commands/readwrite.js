import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('readwrite', (command, equals) => {
  ;(process.env.IS_E2E ? describe.skip : describe)(command, () => {
    let redis

    afterEach(() => {
      if (redis) {
        redis.disconnect()
        redis = null
      }
    })

    it('should return OK', async () => {
      expect.assertions(1)
      redis = new Redis()

      expect(equals(await redis[command](), 'OK')).toBe(true)
    })
  })
})

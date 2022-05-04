import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('readwrite', (command, equals) => {
  ;(process.env.IS_E2E ? describe.skip : describe)(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })
    it('should return OK', async () => {
      expect.assertions(1)

      expect(equals(await redis[command](), 'OK')).toBe(true)
    })
  })
})

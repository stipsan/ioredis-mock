import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('save', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return OK', async () => {
      expect.assertions(1)

      try {
        expect(equals(await redis[command](), 'OK')).toBe(true)
      } catch (err) {
        // in e2e tests it can sometimes throw this error, but that's ok as it's by design
        expect(err.message).toMatch('Background save already in progress')
      }
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('readwrite', (command, equals) => {
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
        // @TODO: we don't have cluster support in the e2e tests yet
        expect(err.message).toMatch(
          'This instance has cluster support disabled'
        )
      }
    })
  })
})

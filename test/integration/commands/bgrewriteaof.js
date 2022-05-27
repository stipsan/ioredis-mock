import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('bgrewriteaof', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return a message', async () => {
      try {
        expect(
          equals(
            await redis[command](),
            'Background append only file rewriting started'
          )
        ).toBe(true)
      } catch (error) {
        expect(error.message).toMatch(
          'Background append only file rewriting already in progress'
        )
      }
    })
  })
})

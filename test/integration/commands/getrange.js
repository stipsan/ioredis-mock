import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('getrange', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return "This"', async () => {
      await redis.set('foo', 'This is a string')
      expect(equals(await redis[command]('foo', 0, 3), 'This')).toBe(true)
    })

    it('should return "ing"', async () => {
      await redis.set('foo', 'This is a string')
      expect(equals(await redis[command]('foo', -3, -1), 'ing')).toBe(true)
    })

    it('should return "This is a string"', async () => {
      await redis.set('foo', 'This is a string')
      expect(
        equals(await redis[command]('foo', 0, -1), 'This is a string')
      ).toBe(true)
    })

    it('should return "string"', async () => {
      await redis.set('foo', 'This is a string')
      expect(equals(await redis[command]('foo', 10, 100), 'string')).toBe(true)
    })
  })
})

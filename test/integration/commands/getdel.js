import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('getdel', (command, equals) => {
  describe(command, () => {
    it('should get the value and delete it', async () => {
      const redis = new Redis()
      await redis.set('foo', 'Hello')

      const result = await redis[command]('foo')
      expect(equals(result, 'Hello')).toBe(true)
      expect(await redis.get('foo')).toBe(null)

      redis.disconnect()
    })
    it('should return null when key does not exist', async () => {
      const redis = new Redis()

      const result = await redis[command]('foo')
      expect(result).toBe(null)

      redis.disconnect()
    })

    it('should throw on cases where key is not a string', async () => {
      expect.hasAssertions()
      const redis = new Redis()
      await redis.sadd('foos', 1, 2, 3)

      try {
        await redis[command]('foos')
      } catch (err) {
        expect(err.message).toMatch(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      }

      redis.disconnect()
    })
  })
})

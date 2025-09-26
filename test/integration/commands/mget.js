import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('mget', (command, equals) => {
  describe(command, () => {
    it('should throw error when called with no arguments', async () => {
      const redis = new Redis()

      let error
      try {
        await redis[command]()
      } catch (err) {
        error = err
      }

      expect(error).toBeDefined()
      expect(error.message).toBe(
        "ERR wrong number of arguments for 'mget' command"
      )

      redis.disconnect()
    })

    it('should throw error when called with empty array', async () => {
      const redis = new Redis()

      let error
      try {
        await redis[command]([])
      } catch (err) {
        error = err
      }

      expect(error).toBeDefined()
      expect(error.message).toBe(
        "ERR wrong number of arguments for 'mget' command"
      )

      redis.disconnect()
    })

    it('should return null on keys that do not exist', async () => {
      const redis = new Redis()

      const result = await redis[command]('foo')
      expect(result[0]).toBe(null)

      redis.disconnect()
    })

    it('should return value keys that exist', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')

      const result = await redis[command]('foo', 'hello')
      expect(equals(result[0], 'bar')).toBe(true)
      expect(result[1]).toBe(null)

      redis.disconnect()
    })
  })
})

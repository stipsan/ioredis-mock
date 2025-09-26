import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('mset', (command, equals) => {
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
        "ERR wrong number of arguments for 'mset' command"
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
        "ERR wrong number of arguments for 'mset' command"
      )

      redis.disconnect()
    })

    it('should batch set values', async () => {
      const redis = new Redis()

      expect(
        equals(await redis[command]('key1', 'Hello', 'key2', 'World'), 'OK')
      ).toBe(true)
      expect(await redis.get('key1')).toBe('Hello')
      expect(await redis.get('key2')).toBe('World')
      redis.disconnect()
    })
  })
})

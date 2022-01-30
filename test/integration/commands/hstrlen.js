import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hstrlen', command => {
  describe(command, () => {
    it('should throw if wrong number of arguments', async () => {
      const redis = new Redis()

      expect.assertions(2)
      try {
        await redis[command]()
      } catch (error) {
        expect(error.message).toMatch('wrong number of arguments')
      }

      try {
        await redis[command]('nonexisting')
      } catch (error) {
        expect(error.message).toMatch('wrong number of arguments')
      }

      redis.disconnect()
    })

    it('should return 0 on fields that do not exist', async () => {
      const redis = new Redis()
      await redis.hset('mykey', 'foo', 'Hello World')

      expect(await redis[command]('mykey', 'nonexisting')).toBe(0)

      redis.disconnect()
    })

    it('should return length on existing fields', async () => {
      const redis = new Redis()
      await redis.hset('mykey', 'foo', 'Hello World')

      expect(await redis[command]('mykey', 'foo')).toBe(11)

      redis.disconnect()
    })
  })
})

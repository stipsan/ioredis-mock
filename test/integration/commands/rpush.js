import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('rpush', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should add the values to the list in the correct order', async () => {
      await redis[command]('foo', 1, 9, 8, 7)
      expect(await redis.lrange('foo', 0, -1)).toEqual(['1', '9', '8', '7'])
    })

    it('should return the new length of the list', async () => {
      expect(await redis[command]('foo', 9, 8, 7)).toBe(3)
    })

    it('should throw an exception if the key contains something other than a list', async () => {
      await redis.set('foo', 'not a list')

      try {
        await redis[command]('foo', 1)
      } catch (err) {
        expect(err.message).toBe('Key foo does not contain a list')
      }
    })
  })
})

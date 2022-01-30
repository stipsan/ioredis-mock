import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('rpushx', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should add the values to the list in the correct order', async () => {
      await redis.rpush('foo', '1')

      await redis[command]('foo', 2)

      expect(await redis.lrange('foo', 0, -1)).toEqual(['1', '2'])
    })

    it('should return the new length of the list', async () => {
      await redis.rpush('foo', '1')

      expect(await redis[command]('foo', 2)).toBe(2)
    })

    it('should return 0 if list does not exist', async () => {
      expect(await redis[command]('foo', 1)).toBe(0)
    })
  })
})

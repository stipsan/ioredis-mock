import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('getbit', command => {
  describe(command, () => {
    it('should return 0 on keys that do not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('foo', 0)).toBe(0)
      redis.disconnect()
    })

    it('should throw if offset > 2^32', async () => {
      const redis = new Redis()

      await expect(redis[command]('foo', 2 ** 32)).rejects.toThrow(
        'ERR bit offset is not an integer or out of range'
      )
      redis.disconnect()
    })

    it('should return bit value of key', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')

      expect(await redis[command]('foo', 10)).toBe(1)
      redis.disconnect()
    })

    it('should return 0 if offset is out of range', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')

      expect(await redis[command]('foo', 2 ** 32 - 1)).toBe(0)
      redis.disconnect()
    })
  })
})

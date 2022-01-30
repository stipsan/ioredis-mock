import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hkeys', (command, equals) => {
  describe(command, () => {
    it('should return an empty array if there are no keys', async () => {
      const redis = new Redis()

      const result = await redis[command]('foo')
      expect(result).toEqual([])

      redis.disconnect()
    })

    it('should return all data keys', async () => {
      const redis = new Redis()
      await redis.hset('foo', 'bar', '1', 'baz', '2')
      const result = await redis[command]('foo')
      expect(equals(result[0], 'bar')).toBe(true)
      expect(equals(result[1], 'baz')).toBe(true)

      redis.disconnect()
    })
  })
})

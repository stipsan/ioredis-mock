import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('sadd', command => {
  describe(command, () => {
    it('should add 1 item to set', async () => {
      const redis = new Redis()

      expect(await redis[command]('foos', 'bar')).toBe(1)
      expect(await redis.smembers('foos')).toEqual(['bar'])
      redis.disconnect()
    })
    it('should add 2 items to set', async () => {
      const redis = new Redis()
      await redis[command]('foos', 'bar')

      expect(await redis[command]('foos', 'foo', 'baz')).toBe(2)
      expect((await redis.smembers('foos')).sort()).toEqual([
        'bar',
        'baz',
        'foo',
      ])
      redis.disconnect()
    })
    it('should not increase length when adding duplicates', async () => {
      const redis = new Redis()

      expect(await redis[command]('key', 'value', 'value')).toBe(1)
      expect((await redis.smembers('key')).sort()).toEqual(['value'])
      redis.disconnect()
    })
  })
})

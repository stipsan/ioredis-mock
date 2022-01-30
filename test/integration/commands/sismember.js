import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('sismember', command => {
  describe(command, () => {
    it('should check if item exists in set', async () => {
      const redis = new Redis({
        data: {
          foos: new Set(['foo', 'bar']),
        },
      })
      await redis.sadd('foos', 'foo', 'bar')

      expect(await redis[command]('foos', 'foo')).toBe(1)

      expect(await redis[command]('foos', 'foobar')).toBe(0)

      redis.disconnect()
    })
  })
})

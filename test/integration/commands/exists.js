import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('exists', command => {
  describe(command, () => {
    it('should return how many keys exists', async () => {
      const redis = new Redis()
      await redis.set('foo', '1')
      await redis.set('bar', '1')
      expect(await redis[command]('foo', 'bar', 'baz')).toBe(2)
      redis.disconnect()
    })
  })
})

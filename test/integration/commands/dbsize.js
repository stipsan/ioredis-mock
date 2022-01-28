import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('dbsize', command => {
  describe(command, () => {
    it('should return how many keys exists in db', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')
      await redis.set('bar', 'foo')

      expect(await redis[command]()).toBe(2)
      redis.disconnect()
    })
  })
})

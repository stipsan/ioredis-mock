import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('setnx', command => {
  describe(command, () => {
    it('should set a key with value if it does not exist already', async () => {
      const redis = new Redis()

      expect(await redis[command]('foo', 'bar')).toBe(1)
      expect(await redis.get('foo')).toBe('bar')

      expect(await redis[command]('foo', 'baz')).toBe(0)
      expect(await redis.get('foo')).not.toBe('baz')

      redis.disconnect()
    })
  })
})

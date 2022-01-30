import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('setex', (command, equals) => {
  describe(command, () => {
    it('should set value and expire', async () => {
      const redis = new Redis()

      const status = await redis[command]('foo', 10, 'bar')
      expect(equals(status, 'OK')).toBe(true)
      expect(await redis.get('foo')).toBe('bar')
      expect(await redis.ttl('foo')).toBeGreaterThan(0)

      redis.disconnect()
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('setex', (command, equals) => {
  describe(command, () => {
    it('should set value and expire', async () => {
      const redis = new Redis()

      const status = await redis[command]('foo', 1, 'bar')
      expect(equals(status, 'OK')).toBe(true)
      expect(await redis.get('foo')).toBe('bar')
      expect(await redis.ttl('foo')).toBe(1)

      await new Promise(resolve => {
        return setTimeout(resolve, 1500)
      })

      expect(await redis.get('foo')).toBe(null)
      expect(await redis.ttl('foo')).toBe(-2)

      redis.disconnect()
    })
  })
})

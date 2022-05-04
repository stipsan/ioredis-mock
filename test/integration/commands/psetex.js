import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('psetex', (command, equals) => {
  describe(command, () => {
    it('should set value and expire', async () => {
      const redis = new Redis()

      const status = await redis[command]('foo', 100, 'bar')
      expect(equals(status, 'OK')).toBe(true)
      expect(await redis.get('foo')).toBe('bar')
      expect(await redis.pttl('foo')).toBeGreaterThan(0)

      await new Promise(resolve => setTimeout(resolve, 200))

      expect(await redis.get('foo')).toBe(null)
      expect(await redis.pttl('foo')).toBe(-2)

      redis.disconnect()
    })
  })
})

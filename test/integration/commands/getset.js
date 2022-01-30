import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('getset', (command, equals) => {
  describe(command, () => {
    it('should set the new value and return the old value', async () => {
      const redis = new Redis()
      await redis.set('foo', 'Hello')

      const result = await redis[command]('foo', 'World')
      expect(equals(result, 'Hello')).toBe(true)
      expect(await redis.get('foo')).toBe('World')

      redis.disconnect()
    })
    it('should set the new value and return null when does not have an old value', async () => {
      const redis = new Redis()

      const result = await redis[command]('foo', 'World')
      expect(result).toBe(null)
      expect(await redis.get('foo')).toBe('World')

      redis.disconnect()
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('mset', (command, equals) => {
  describe(command, () => {
    it('should batch set values', async () => {
      const redis = new Redis()

      expect(
        equals(await redis[command]('key1', 'Hello', 'key2', 'World'), 'OK')
      ).toBe(true)
      expect(await redis.get('key1')).toBe('Hello')
      expect(await redis.get('key2')).toBe('World')
      redis.disconnect()
    })
  })
})

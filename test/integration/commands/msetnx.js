import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('msetnx', command => {
  describe(command, () => {
    it('should batch set values', async () => {
      const redis = new Redis()

      expect(await redis[command]('key1', 'Hello', 'key2', 'World')).toBe(1)

      expect(await redis.get('key1')).toBe('Hello')
      expect(await redis.get('key2')).toBe('World')

      redis.disconnect()
    })

    it('should bail on batch set values if just one key exists', async () => {
      const redis = new Redis()
      await redis.set('key1', 'Nope')

      expect(await redis[command]('key1', 'Hello', 'key2', 'World')).toBe(0)

      expect(await redis.get('key1')).toBe('Nope')
      expect(await redis.get('key2')).toBe(null)

      redis.disconnect()
    })
  })
})

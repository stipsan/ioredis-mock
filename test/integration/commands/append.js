import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('append', command => {
  describe(command, () => {
    it('should append to exiting string and return new length', async () => {
      const redis = new Redis()
      await redis.set('mykey', 'Hello')

      expect(await redis[command]('mykey', ' World')).toBe(11)
      expect(await redis.get('mykey')).toBe('Hello World')
      redis.disconnect()
    })
    it('should set empty string if key does not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('mykey', ' World')).toBe(6)
      expect(await redis.get('mykey')).toBe(' World')
      redis.disconnect()
    })
  })
})

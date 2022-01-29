import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('incr', command => {
  describe(command, () => {
    it('should increment an integer', async () => {
      const redis = new Redis()
      await redis.set('user_next', 1)

      expect(await redis[command]('user_next')).toBe(2)
      expect(await redis.get('user_next')).toBe('2')
      redis.disconnect()
    })

    it('should set default value if not exists', async () => {
      const redis = new Redis()

      expect(await redis[command]('user_next')).toBe(1)
      expect(await redis.get('user_next')).toBe('1')
      redis.disconnect()
    })
  })
})

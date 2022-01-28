import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('decr', command => {
  describe(command, () => {
    it('should decrement an integer', async () => {
      const redis = new Redis()
      await redis.set('user_next', '2')

      expect(await redis[command]('user_next')).toBe(1)
      expect(await redis.get('user_next')).toBe('1')
      redis.disconnect()
    })
  })
})

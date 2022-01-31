import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('setrange', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return "Hello Redis"', async () => {
      await redis.set('key1', 'Hello World')
      expect(await redis[command]('key1', 6, 'Redis')).toBe(11)
    })

    it('should return zero padding', async () => {
      expect(await redis[command]('key2', 6, 'Redis')).toBe(11)
      expect(await redis.get('key2')).toBe('\x00\x00\x00\x00\x00\x00Redis')
    })
  })
})

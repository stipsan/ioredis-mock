import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hsetnx', command => {
  describe(command, () => {
    it('should set a key in a hash map if it does not exist already', async () => {
      const redis = new Redis()

      expect(
        await redis[command]('emails', 'bruce@wayne.enterprises', '1')
      ).toBe(1)
      expect(await redis.hgetall('emails')).toEqual({
        'bruce@wayne.enterprises': '1',
      })

      expect(
        await redis[command]('emails', 'bruce@wayne.enterprises', '2')
      ).toBe(0)
      expect(await redis.hgetall('emails')).not.toEqual({
        'bruce@wayne.enterprises': '2',
      })

      redis.disconnect()
    })
  })
})

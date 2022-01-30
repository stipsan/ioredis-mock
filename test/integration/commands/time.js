import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('time', command => {
  describe(command, () => {
    it('should return an array with current time in seconds and microseconds', async () => {
      const redis = new Redis()

      const result = await redis[command]()
      const dateTime = Buffer.isBuffer(result[0])
        ? result[0].toString()
        : result[0]
      const hrTime = Buffer.isBuffer(result[1])
        ? result[1].toString()
        : result[1]
      expect(dateTime).toEqual(expect.any(String))
      expect(hrTime).toEqual(expect.any(String))
      expect(parseInt(dateTime, 10)).toEqual(expect.any(Number))
      expect(parseInt(hrTime, 10)).toEqual(expect.any(Number))
      expect(Number.isNaN(parseInt(dateTime, 10))).toBe(false)
      expect(Number.isNaN(parseInt(hrTime, 10))).toBe(false)

      redis.disconnect()
    })
  })
})

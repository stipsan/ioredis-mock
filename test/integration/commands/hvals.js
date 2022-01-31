import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hvals', (command, equals) => {
  describe(command, () => {
    it('should return an array over all the values in a hash map', async () => {
      const redis = new Redis()
      await redis.hset(
        'emails',
        'clark@daily.planet',
        1,
        'bruce@wayne.enterprises',
        2
      )

      const result = await redis[command]('emails')
      expect(equals(result[0], '1')).toBe(true)
      expect(equals(result[1], '2')).toBe(true)

      redis.disconnect()
    })

    it("should return empty array if sources don't exists", async () => {
      const redis = new Redis()

      expect(await redis[command]('emails')).toEqual([])

      redis.disconnect()
    })
  })
})

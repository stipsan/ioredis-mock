import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hgetall', (command, equals) => {
  describe(command, () => {
    it('should return all the keys and values in a hash map', async () => {
      const emails = {
        'clark@daily.planet': '1',
        'bruce@wayne.enterprises': '2',
      }
      const redis = new Redis({
        data: {
          emails,
        },
      })

      const result = await redis[command]('emails')

      Object.keys(result).forEach(key => {
        equals(result[key], emails[key])
      })
      redis.disconnect()
    })

    it('should return an empty object if the hash does not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('emails')).toEqual({})
      redis.disconnect()
    })
  })
})

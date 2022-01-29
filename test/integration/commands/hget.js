import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hget', (command, equals) => {
  describe(command, () => {
    it('should fetch a property in a hash', async () => {
      const redis = new Redis({
        data: {
          emails: {
            'clark@daily.planet': '1',
          },
        },
      })

      expect(
        equals(await redis[command]('emails', 'clark@daily.planet'), '1')
      ).toBe(true)
      redis.disconnect()
    })

    it('should return null if the hash does not exist', async () => {
      const redis = new Redis()
      expect(await redis[command]('emails', 'clark@daily.planet')).toBe(null)
      redis.disconnect()
    })

    it('should return null if the item does not exist in the hash', async () => {
      const redis = new Redis({
        data: {
          emails: {
            'clark@daily.planet': '1',
          },
        },
      })

      expect(await redis[command]('emails', 'lois@daily.planet')).toBe(null)
      redis.disconnect()
    })
  })
})

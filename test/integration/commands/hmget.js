import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hmget', (command, equals) => {
  describe(command, () => {
    it('should return the values of specified keys in a hash map', async () => {
      const redis = new Redis()
      await redis.hset('user:1', 'id', '1', 'email', 'bruce@wayne.enterprises')

      const [id, email, location] = await redis[command](
        'user:1',
        'id',
        'email',
        'location'
      )
      expect(equals(id, '1')).toBe(true)
      expect(equals(email, 'bruce@wayne.enterprises')).toBe(true)
      expect(location).toBe(null)
      redis.disconnect()
    })

    it('should return an array of nulls if the hash does not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('user:1', 'id', 'email', 'location')).toEqual(
        [null, null, null]
      )
      redis.disconnect()
    })
  })
})

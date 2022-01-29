import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hmset', (command, equals) => {
  describe(command, () => {
    it('should let you set multiple hash map keys and values in a single command', async () => {
      const redis = new Redis()
      const hash = { id: '1', email: 'bruce@wayne.enterprises' }

      expect(
        equals(
          await redis[command](
            'user:1',
            'id',
            '1',
            'email',
            'bruce@wayne.enterprises'
          ),
          'OK'
        )
      ).toBe(true)
      expect(await redis.hgetall('user:1')).toEqual(hash)
      redis.disconnect()
    })

    it('should let you set multiple hash map keys and values with an object', async () => {
      const redis = new Redis()
      const hash = { id: '1', email: 'bruce@wayne.enterprises' }

      const result = await redis[command]('user:1', hash)
      expect(equals(result, 'OK')).toBe(true)
      expect(await redis.hgetall('user:1')).toEqual(hash)
      redis.disconnect()
    })
  })
})

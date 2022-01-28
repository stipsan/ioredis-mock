import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hset', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return 1 when setting a new field', async () => {
      expect(
        await redis[command]('user:1', 'email', 'clark@daily.planet')
      ).toBe(1)

      expect(await redis.hgetall('user:1')).toEqual({
        email: 'clark@daily.planet',
      })
    })

    it('should return 2 when setting a 2 fields', async () => {
      expect(
        await redis[command](
          'user:1',
          'email',
          'bruce@wayne.enterprises',
          'age',
          '24'
        )
      ).toBe(2)
      expect(await redis.hgetall('user:1')).toEqual({
        email: 'bruce@wayne.enterprises',
        age: '24',
      })
    })

    it('should return 0 when overwriting existing field', async () => {
      await redis[command]('user:1', 'email', 'clark@daily.planet')
      expect(
        await redis[command]('user:1', 'email', 'bruce@wayne.enterprises')
      ).toBe(0)
      expect(await redis.hgetall('user:1')).toEqual({
        email: 'bruce@wayne.enterprises',
      })
    })

    it('should allow setting multiple fields', async () => {
      await redis[command]('user:1', 'email', 'clark@daily.planet')
      expect(
        await redis[command](
          'user:1',
          'email',
          'bruce@wayne.enterprises',
          'age',
          '24'
        )
      ).toBe(1)
      expect(await redis.hgetall('user:1')).toEqual({
        email: 'bruce@wayne.enterprises',
        age: '24',
      })
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hlen', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return an empty array if there are no keys', () =>
      redis[command]('foo').then(result => expect(result).toBe(0)))

    it('should return all data keys', async () => {
      await redis.hset('foo', 'bar', '1', 'baz', '2')

      return redis[command]('foo').then(result => expect(result).toEqual(2))
    })
  })
})

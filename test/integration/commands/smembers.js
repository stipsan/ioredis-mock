import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('smembers', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should returns items in set as array', async () => {
      await redis.sadd('foos', 'bar', 'foo')

      return redis[command]('foos').then(result => {
        const formatted =
          command === 'smembersBuffer' ? result.map(v => v.toString()) : result
        return expect(formatted.sort()).toEqual(['bar', 'foo'])
      })
    })
    it("should return empty array if source don't exists", () => {
      return redis[command]('bars').then(result => expect(result).toEqual([]))
    })
  })
})

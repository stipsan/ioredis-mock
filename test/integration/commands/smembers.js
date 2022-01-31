import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('smembers', command => {
  describe(command, () => {
    it('should returns items in set as array', () => {
      const redis = new Redis({
        data: {
          foos: new Set(['bar', 'foo']),
        },
      })

      return redis[command]('foos').then(result => {
        const formatted =
          command === 'smembersBuffer'
            ? result.map(v => {
                return v.toString()
              })
            : result
        return expect(formatted.sort()).toEqual(['bar', 'foo'])
      })
    })
    it("should return empty array if source don't exists", () => {
      const redis = new Redis()

      return redis[command]('bars').then(result => {
        return expect(result).toEqual([])
      })
    })
  })
})

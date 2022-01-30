import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hlen', command => {
  describe(command, () => {
    it('should return an empty array if there are no keys', () => {
      const redis = new Redis()

      return redis[command]('foo').then(result => {
        return expect(result).toBe(0)
      })
    })

    it('should return all data keys', () => {
      const redis = new Redis({
        data: {
          foo: { bar: '1', baz: '2' },
        },
      })

      return redis[command]('foo').then(result => {
        return expect(result).toEqual(2)
      })
    })
  })
})

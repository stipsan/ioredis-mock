import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('scard', command => {
  describe(command, () => {
    it('should return the number of items in the set', () => {
      const redis = new Redis({
        data: {
          foo: new Set([1, 3, 4]),
        },
      })

      return redis[command]('foo').then(length => expect(length).toBe(3))
    })

    it('should return 0 if the set does not exist', () => {
      const redis = new Redis()

      return redis[command]('foo').then(length => expect(length).toBe(0))
    })

    it('should throw an exception if the key contains something other than a set', () => {
      const redis = new Redis({
        data: {
          foo: 'not a set',
        },
      })

      return redis[command]('foo').catch(err =>
        expect(err.message).toBe('Key foo does not contain a set')
      )
    })
  })
})

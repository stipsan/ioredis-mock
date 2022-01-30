import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('llen', command => {
  describe(command, () => {
    it('should return the number of items in the list', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '3', '4'],
        },
      })

      return redis[command]('foo').then(length => {
        return expect(length).toBe(3)
      })
    })

    it('should return 0 if the list does not exist', () => {
      const redis = new Redis({
        data: {},
      })

      return redis[command]('foo').then(length => {
        return expect(length).toBe(0)
      })
    })

    it('should throw an exception if the key contains something other than a list', () => {
      const redis = new Redis({
        data: {
          foo: 'not a list',
        },
      })

      return redis[command]('foo').catch(err => {
        return expect(err.message).toBe('Key foo does not contain a list')
      })
    })
  })
})

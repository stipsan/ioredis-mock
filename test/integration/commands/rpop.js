import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('rpop', command => {
  describe(command, () => {
    it('should remove and return last element of list', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3'],
        },
      })

      return redis[command]('foo')
        .then(result => {
          return expect(result).toBe('3')
        })
        .then(async () => {
          return expect(redis.data.get('foo')).toEqual(['1', '2'])
        })
    })

    it('should return buffer values correctly', () => {
      const bufferVal = Buffer.from('bar')
      const redis = new Redis({
        data: {
          foo: ['1', '2', bufferVal],
        },
      })

      return redis[command]('foo').then(result => {
        return expect(result).toBe(bufferVal)
      })
    })

    it('should return null on empty list', () => {
      const redis = new Redis({
        data: {
          foo: [],
        },
      })

      return redis[command]('foo').then(result => {
        return expect(result).toBe(null)
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

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lindex', (command, equals) => {
  describe(command, () => {
    it('should return item list', () => {
      const redis = new Redis({
        data: {
          mylist: ['Hello', 'World'],
        },
      })

      return redis[command]('mylist', 0)
        .then(result => {
          return expect(equals(result, 'Hello')).toBe(true)
        })
        .then(() => {
          return redis[command]('mylist', -1)
        })
        .then(result => {
          return expect(equals(result, 'World')).toBe(true)
        })
        .then(() => {
          return redis[command]('mylist', 3)
        })
        .then(result => {
          return expect(result).toBe(null)
        })
    })

    it('should return null if the list does not exist', () => {
      const redis = new Redis({
        data: {},
      })

      return redis[command]('foo', 0).then(result => {
        return expect(result).toBe(null)
      })
    })

    it('should throw an exception if the key contains something other than a list', () => {
      const redis = new Redis({
        data: {
          foo: 'not a list',
        },
      })

      return redis[command]('foo', 0).catch(err => {
        return expect(err.message).toBe('Key foo does not contain a list')
      })
    })
  })
})

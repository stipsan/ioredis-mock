import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lrange', command => {
  describe(command, () => {
    it('should return first 3 items', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return redis[command]('foo', 0, 2).then(res => {
        return expect(
          res.map(v => {
            return Buffer.isBuffer(v) ? v.toString() : v
          })
        ).toEqual(['1', '2', '3'])
      })
    })

    it('should return last 3 items', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return redis[command]('foo', -3, -1).then(res => {
        return expect(
          res.map(v => {
            return Buffer.isBuffer(v) ? v.toString() : v
          })
        ).toEqual(['3', '4', '5'])
      })
    })

    it('should return last all items on larger numbers', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return redis[command]('foo', 0, 100).then(res => {
        return expect(
          res.map(v => {
            return Buffer.isBuffer(v) ? v.toString() : v
          })
        ).toEqual(['1', '2', '3', '4', '5'])
      })
    })

    it('should return empty array if out-of-range', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return redis[command]('foo', 10, 100).then(res => {
        return expect(
          res.map(v => {
            return Buffer.isBuffer(v) ? v.toString() : v
          })
        ).toEqual([])
      })
    })

    it('should throw an exception if the key contains something other than a list', () => {
      const redis = new Redis({
        data: {
          foo: 'not a list',
        },
      })

      return redis[command]('foo', 0, 2).catch(err => {
        return expect(err.message).toBe('Key foo does not contain a list')
      })
    })
  })
})

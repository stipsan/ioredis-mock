import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('sdiff', command => {
  describe(command, () => {
    it('should return the difference between the first set and all the successive sets', () => {
      const redis = new Redis({
        data: {
          key1: new Set(['a', 'b', 'c', 'd']),
          key2: new Set(['c']),
          // key3: keys that do not exist are considered to be empty sets
          key4: new Set(['a', 'c', 'e']),
        },
      })

      return redis[command]('key1', 'key2', 'key3', 'key4').then(result =>
        expect(
          command === 'sdiffBuffer' ? result.map(r => r.toString()) : result
        ).toEqual(['b', 'd'])
      )
    })

    it('should throw an exception if the first key is not of a set', () => {
      const redis = new Redis({
        data: {
          foo: 'not a set',
        },
      })

      return redis[command]('foo', 'bar').catch(err =>
        expect(err.message).toBe('Key foo does not contain a set')
      )
    })

    it('should throw an exception if the destination contains something other than a set', () => {
      const redis = new Redis({
        data: {
          foo: new Set(),
          bar: 'not a set',
        },
      })

      return redis[command]('foo', 'bar').catch(err =>
        expect(err.message).toBe('Key bar does not contain a set')
      )
    })

    it("should return empty array if sources don't exists", () => {
      const redis = new Redis()

      return redis[command]('foo', 'bar').then(result =>
        expect(
          command === 'sdiffBuffer' ? result.map(r => r.toString()) : result
        ).toEqual([])
      )
    })
  })
})

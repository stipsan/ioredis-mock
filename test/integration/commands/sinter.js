import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('sinter', command => {
  describe(command, () => {
    it('should return the members from the intersection of all the given sets', () => {
      const redis = new Redis({
        data: {
          key1: new Set(['a', 'b', 'c', 'd']),
          key2: new Set(['c']),
          key3: new Set(['a', 'c', 'e']),
        },
      })

      return redis[command]('key1', 'key2', 'key3').then(result =>
        expect(
          command === 'sinterBuffer' ? result.map(v => v.toString()) : result
        ).toEqual(['c'])
      )
    })

    it('should throw an exception if one of the keys is not a set', () => {
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
        expect(result).toEqual([])
      )
    })
  })
})

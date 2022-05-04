import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('sinterstore', command => {
  describe(command, () => {
    it('should store the members from the intersection of all the given sets at dest and return the size', () => {
      const redis = new Redis({
        data: {
          key1: new Set(['a', 'b', 'c', 'd']),
          key2: new Set(['c']),
          key3: new Set(['a', 'c', 'e']),
        },
      })

      return redis[command]('dest', 'key1', 'key2', 'key3')
        .then(count => expect(count).toEqual(1))
        .then(() => redis.smembers('dest'))
        .then(result => expect(result).toEqual(['c']))
    })

    it('should throw an exception if one of the keys is not a set', () => {
      const redis = new Redis({
        data: {
          foo: new Set(),
          bar: 'not a set',
        },
      })

      return expect(redis[command]('foo', 'bar')).rejects.toEqual(
        Error(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      )
    })

    it("should compute empty array if sources don't exists", () => {
      const redis = new Redis()

      return redis[command]('dest', 'foo', 'bar')
        .then(count => expect(count).toEqual(0))
        .then(() => redis.smembers('dest'))
        .then(result => expect(result).toEqual([]))
    })
  })
})

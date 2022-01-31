import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('zinterstore', command => {
  describe(command, () => {
    const data = {
      foo: new Map([
        ['first', { score: 1, value: 'first' }],
        ['second', { score: 2, value: 'second' }],
        ['third', { score: 3, value: 'third' }],
        ['fourth', { score: 4, value: 'fourth' }],
        ['fifth', { score: 5, value: 'fifth' }],
      ]),
      bar: new Map([
        ['first', { score: 1, value: 'first' }],
        ['third', { score: 3, value: 'third' }],
        ['fourth', { score: 4, value: 'fourth' }],
        ['tenth', { score: 10, value: 'tenth' }],
      ]),
      baz: new Map([
        ['twentieth', { score: 20, value: 'twentieth' }],
        ['thirtieth', { score: 30, value: 'thirtiest' }],
      ]),
      key: 'value',
    }

    it('should intersect two sorted sets and return the number of resulting elements', () => {
      const redis = new Redis({ data })

      return redis[command]('dest', 2, 'foo', 'bar').then(res => {
        return expect(res).toEqual(3)
      })
    })

    it('should return 0 if the intersection is an empty set', () => {
      const redis = new Redis({ data })

      return redis[command]('dest', 2, 'foo', 'baz').then(res => {
        return expect(res).toEqual(0)
      })
    })

    it('should not create a sorted set if the intersection is an empty set', () => {
      const redis = new Redis({ data })

      return redis[command]('dest', 2, 'foo', 'baz').then(() => {
        expect(redis.data.get('dest')).toBe(undefined)
      })
    })

    it('should intersect two sorted sets with the correct data in the specified key', () => {
      const redis = new Redis({ data })

      return redis[command]('dest', 2, 'foo', 'bar').then(() => {
        expect(redis.data.get('dest')).toEqual(
          new Map([
            ['first', { score: 2, value: 'first' }],
            ['third', { score: 6, value: 'third' }],
            ['fourth', { score: 8, value: 'fourth' }],
          ])
        )
      })
    })

    it('should throw a syntax error if more keys specified than numKeys', () => {
      const redis = new Redis({ data })

      return redis[command]('dest', 2, 'foo', 'bar', 'baz').catch(err => {
        return expect(err.message).toBe('ERR syntax error')
      })
    })

    it('should throw a syntax error if fewer keys specified than numKeys', () => {
      const redis = new Redis({ data })

      return redis[command]('dest', 3, 'foo', 'bar').catch(err => {
        return expect(err.message).toBe('ERR syntax error')
      })
    })

    it('should return 0 if one of the keys does not exist', () => {
      const redis = new Redis({ data })

      return redis[command]('dest', 2, 'foo', 'doesnotexist').then(res => {
        return expect(res).toEqual(0)
      })
    })

    it('should return 0 if one of the keys is not a sorted set', () => {
      const redis = new Redis({ data })

      return redis[command]('dest', 2, 'foo', 'key').then(res => {
        return expect(res).toEqual(0)
      })
    })
  })
})

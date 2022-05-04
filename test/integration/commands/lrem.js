import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lrem', command => {
  describe(command, () => {
    it('should remove the items from the end of the list when count is negative', () => {
      const redis = new Redis({
        data: {
          foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
        },
      })

      return redis[command]('foo', -2, 'foo').then(() =>
        expect(redis.data.get('foo')).toEqual(['foo', 'bar', 'baz'])
      )
    })

    it('should remove the items from the beginning of the list when count is positive', () => {
      const redis = new Redis({
        data: {
          foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
        },
      })

      return redis[command]('foo', 2, 'foo').then(() =>
        expect(redis.data.get('foo')).toEqual(['bar', 'baz', 'foo'])
      )
    })

    it('should remove all the items when count is 0', () => {
      const redis = new Redis({
        data: {
          foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
        },
      })

      return redis[command]('foo', 0, 'foo').then(() =>
        expect(redis.data.get('foo')).toEqual(['bar', 'baz'])
      )
    })

    it('should return the number of items removed ', () => {
      const redis = new Redis({
        data: {
          foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
        },
      })

      return redis[command]('foo', -2, 'baz').then(removed =>
        expect(removed).toBe(1)
      )
    })

    it('should return 0 if the key contains something other than a list', () => {
      const redis = new Redis({
        data: {
          foo: 'not a list',
        },
      })

      return redis[command]('foo', 1).then(removed => expect(removed).toBe(0))
    })
  })
})

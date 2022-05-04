import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('zrem', command => {
  describe(command, () => {
    const data = {
      foos: new Map([
        ['foo', { value: 'foo', score: 1 }],
        ['bar', { value: 'bar', score: 2 }],
        ['baz', { value: 'baz', score: 3 }],
      ]),
    }
    it('should remove 1 item from sorted set', () => {
      const redis = new Redis({ data })
      return redis[command]('foos', 'foo')
        .then(status => expect(status).toBe(1))
        .then(() => expect(redis.data.get('foos').has('foo')).toBe(false))
    })
    it('should remove 2 items from sorted set', () => {
      const redis = new Redis({ data })
      return redis[command]('foos', 'foo', 'baz')
        .then(status => expect(status).toBe(2))
        .then(() => {
          expect(redis.data.get('foos').has('foo')).toBe(false)
          expect(redis.data.get('foos').has('bar')).toBe(true)
          expect(redis.data.get('foos').has('baz')).toBe(false)
        })
    })
    it('should not remove an item that does not exist', () => {
      const redis = new Redis({ data })
      return redis[command]('foos', 'qux')
        .then(status => expect(status).toBe(0))
        .then(() => expect(redis.data.get('foos').has('qux')).toBe(false))
    })
    it('should ignore non-existent keys', () => {
      const redis = new Redis({ data })
      return redis[command]('bars', 'bar')
        .then(status => expect(status).toBe(0))
        .then(() => expect(redis.data.get('bars')).toBeFalsy())
    })
  })
})

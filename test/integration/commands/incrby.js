import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('incrby', command => {
  describe(command, () => {
    it('should initialize the key with 0 if there is no key', () => {
      const redis = new Redis({
        data: {},
      })

      return redis[command]('user_next', 10)
        .then(userNext => expect(userNext).toBe(10))
        .then(() => expect(redis.data.get('user_next')).toBe('10'))
    })
    it('should increment an integer with passed increment', () => {
      const redis = new Redis({
        data: {
          user_next: '1',
        },
      })

      return redis[command]('user_next', 10)
        .then(userNext => expect(userNext).toBe(11))
        .then(() => expect(redis.data.get('user_next')).toBe('11'))
    })
    it('should not increment if no increment is passed', () => {
      const redis = new Redis({
        data: {
          user_next: '1',
        },
      })

      return redis[command]('user_next')
        .then(userNext => expect(userNext).toBe(1))
        .then(() => expect(redis.data.get('user_next')).toBe('1'))
    })
  })
})

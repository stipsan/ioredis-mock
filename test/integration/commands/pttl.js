import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('pttl', command => {
  describe(command, () => {
    it('should return -2 if key does not exist', () => {
      const redis = new Redis()

      return redis[command]('foo').then(result => expect(result).toBe(-2))
    })

    it('should return -1 if key exist but have no expire', () => {
      const redis = new Redis({
        data: {
          foo: 'bar',
        },
      })

      return redis[command]('foo').then(result => expect(result).toBe(-1))
    })

    it('should return seconds left until expire', () => {
      const redis = new Redis({
        data: {
          foo: 'bar',
        },
      })

      return redis
        .expire('foo', 1)
        .then(() => redis[command]('foo'))
        .then(result => expect(result).toBeGreaterThan(0))
    })
  })
})

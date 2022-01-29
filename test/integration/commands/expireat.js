import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('expireat', command => {
  describe(command, () => {
    it('should set expire status on key', () => {
      const redis = new Redis({
        data: {
          foo: 'bar',
        },
      })
      const at = Math.ceil(Date.now() / 1000) + 1
      return redis[command]('foo', at)
        .then(status => {
          expect(status).toBe(1)
          expect(redis.expires.has('foo')).toBe(true)

          return redis.ttl('foo')
        })
        .then(result => {
          return expect(result).toBeGreaterThanOrEqual(1)
        })
    })

    it('should return 0 if key does not exist', () => {
      const redis = new Redis()
      const at = Math.ceil(Date.now() / 1000)
      return redis[command]('foo', at).then(status => {
        return expect(status).toBe(0)
      })
    })
  })
})

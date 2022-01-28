import Promise from 'bluebird'
import Redis from 'ioredis'

describe('pexpire', () => {
  it('should set expire status on key', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
      },
    })
    return redis
      .pexpire('foo', 100)
      .then(status => {
        expect(status).toBe(1)
        expect(redis.expires.has('foo')).toBe(true)

        return redis.pttl('foo')
      })
      .then(result => {
        return expect(result).toBeGreaterThanOrEqual(1)
      })
      .then(() => {
        return Promise.delay(200)
      })
      .then(() => {
        return redis.get('foo')
      })
      .then(result => {
        return expect(result).toBe(null)
      })
  })

  it('should return 0 if key does not exist', () => {
    const redis = new Redis()
    return redis.pexpire('foo', 100).then(status => {
      return expect(status).toBe(0)
    })
  })
})

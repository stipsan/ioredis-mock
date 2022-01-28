import Promise from 'bluebird'
import Redis from 'ioredis'

describe('psetex', () => {
  it('should set value and expire', () => {
    const redis = new Redis()
    return redis
      .psetex('foo', 100, 'bar')
      .then(status => {
        return expect(status).toBe('OK')
      })
      .then(() => {
        expect(redis.data.get('foo')).toBe('bar')
        expect(redis.expires.has('foo')).toBe(true)
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
})

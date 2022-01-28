import Redis from 'ioredis'

describe('get', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new Redis()

    return redis.get('foo').then(result => {
      return expect(result).toBe(null)
    })
  })

  it('should return value of key', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
      },
    })

    return redis.get('foo').then(result => {
      return expect(result).toBe('bar')
    })
  })
})

import Redis from 'ioredis'

describe('randomkey', () => {
  it('should return a random key', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
        bar: 'foo',
      },
    })

    return redis.randomkey().then(result => {
      return expect(['foo', 'bar']).toContain(result)
    })
  })

  it('should return null if db is empty', () => {
    const redis = new Redis()

    return redis.randomkey().then(result => {
      return expect(result).toBe(null)
    })
  })
})

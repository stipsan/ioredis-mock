import Redis from 'ioredis'

describe('sismember', () => {
  it('should check if item exists in set', () => {
    const redis = new Redis({
      data: {
        foos: new Set(['foo', 'bar']),
      },
    })

    return redis
      .sismember('foos', 'foo')
      .then(result => {
        return expect(result).toBe(1)
      })
      .then(() => {
        return redis.sismember('foos', 'foobar')
      })
      .then(result => {
        return expect(result).toBe(0)
      })
  })
})

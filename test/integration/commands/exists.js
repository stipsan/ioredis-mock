import Redis from 'ioredis'

describe('exists', () => {
  const redis = new Redis({
    data: {
      foo: '1',
      bar: '1',
    },
  })
  it('should return how many keys exists', () => {
    return redis.exists('foo', 'bar', 'baz').then(status => {
      return expect(status).toBe(2)
    })
  })
})

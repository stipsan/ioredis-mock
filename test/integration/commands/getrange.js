import Redis from 'ioredis'

describe('getrange', () => {
  const redis = new Redis({
    data: {
      foo: 'This is a string',
    },
  })

  it('should return "This"', () => {
    return redis.getrange('foo', 0, 3).then(result => {
      return expect(result).toBe('This')
    })
  })

  it('should return "ing"', () => {
    return redis.getrange('foo', -3, -1).then(result => {
      return expect(result).toBe('ing')
    })
  })

  it('should return "This is a string"', () => {
    return redis.getrange('foo', 0, -1).then(result => {
      return expect(result).toBe('This is a string')
    })
  })

  it('should return "string"', () => {
    return redis.getrange('foo', 10, 100).then(result => {
      return expect(result).toBe('string')
    })
  })
})

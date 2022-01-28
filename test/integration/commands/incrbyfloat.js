import Redis from 'ioredis'

describe('incrbyfloat', () => {
  it('should initialize the key with 0 if there is no key', () => {
    const redis = new Redis({
      data: {},
    })

    return redis
      .incrbyfloat('user_next', 10.1)
      .then(userNext => {
        return expect(userNext).toBe('10.1')
      })
      .then(() => {
        return expect(redis.data.get('user_next')).toBe('10.1')
      })
  })
  it('should increment an float with passed increment', () => {
    const redis = new Redis({
      data: {
        mykey: '10.50',
      },
    })

    return redis
      .incrbyfloat('mykey', 0.1)
      .then(result => {
        return expect(result).toBe('10.6')
      })
      .then(() => {
        return redis.incrbyfloat('mykey', -5)
      })
      .then(result => {
        return expect(result).toBe('5.6')
      })
      .then(() => {
        return expect(redis.data.get('mykey')).toBe('5.6')
      })
  })

  it('should support exponents', () => {
    const redis = new Redis({
      data: {
        mykey: '5.0e3',
      },
    })

    return redis
      .incrbyfloat('mykey', '2.0e2')
      .then(result => {
        return expect(result).toBe('5200')
      })
      .then(() => {
        return expect(redis.data.get('mykey')).toBe('5200')
      })
  })
})

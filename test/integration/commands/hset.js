import Redis from 'ioredis'

describe('hset', () => {
  const redis = new Redis()

  it('should return 1 when setting a new field', () => {
    return redis
      .hset('user:1', 'email', 'clark@daily.planet')
      .then(status => {
        return expect(status).toBe(1)
      })
      .then(() => {
        return expect(redis.data.get('user:1')).toEqual({
          email: 'clark@daily.planet',
        })
      })
  })

  it('should return 2 when setting a 2 fields', () => {
    return redis
      .hset('user:1', 'email', 'bruce@wayne.enterprises', 'age', '24')
      .then(status => {
        return expect(status).toBe(2)
      })
      .then(() => {
        return expect(redis.data.get('user:1')).toEqual({
          email: 'bruce@wayne.enterprises',
          age: '24',
        })
      })
  })

  it('should return 0 when overwriting existing field', async () => {
    await redis.hset('user:1', 'email', 'clark@daily.planet')
    return redis
      .hset('user:1', 'email', 'bruce@wayne.enterprises')
      .then(status => {
        return expect(status).toBe(0)
      })
      .then(() => {
        return expect(redis.data.get('user:1')).toEqual({
          email: 'bruce@wayne.enterprises',
        })
      })
  })

  it('should allow setting multiple fields', async () => {
    await redis.hset('user:1', 'email', 'clark@daily.planet')
    return redis
      .hset('user:1', 'email', 'bruce@wayne.enterprises', 'age', '24')
      .then(status => {
        return expect(status).toBe(1)
      })
      .then(() => {
        return expect(redis.data.get('user:1')).toEqual({
          email: 'bruce@wayne.enterprises',
          age: '24',
        })
      })
  })
})

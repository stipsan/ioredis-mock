import Redis from 'ioredis'

describe('hmset', () => {
  it('should let you set multiple hash map keys and values in a single command', () => {
    const redis = new Redis()
    const hash = { id: '1', email: 'bruce@wayne.enterprises' }
    return redis
      .hmset('user:1', 'id', '1', 'email', 'bruce@wayne.enterprises')
      .then(status => {
        return expect(status).toBe('OK')
      })
      .then(() => {
        return expect(redis.data.get('user:1')).toEqual(hash)
      })
  })

  it('should let you set multiple hash map keys and values with an object', () => {
    const redis = new Redis()
    const hash = { id: '1', email: 'bruce@wayne.enterprises' }
    return redis
      .hmset('user:1', hash)
      .then(status => {
        return expect(status).toBe('OK')
      })
      .then(() => {
        return expect(redis.data.get('user:1')).toEqual(hash)
      })
  })
})

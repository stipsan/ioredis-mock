import Redis from 'ioredis'

describe('quit', () => {
  const redis = new Redis()
  it('should return OK', () => {
    return redis.quit().then(res => {
      return expect(res).toBe('OK')
    })
  })
})

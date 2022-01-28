import Redis from 'ioredis'

describe('bgsave', () => {
  it('should return OK', () => {
    const redis = new Redis()

    return redis.bgsave().then(status => {
      return expect(status).toBe('OK')
    })
  })
})

import Redis from 'ioredis'

describe('zrevrank', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })
  beforeEach(async () => {
    await redis.zadd('foo', 1, 'first', 2, 'second', 3, 'third')
  })

  it('should do nothing if key does not exist', () => {
    return redis
      .zrevrank('bar', 'not-exist')
      .then(status => expect(status).toBe(null))
  })

  it('should return null if not found', () => {
    return redis
      .zrevrank('foo', 'not-found')
      .then(status => expect(status).toBe(null))
  })

  it('should return found index', () => {
    return redis.zrevrank('foo', 'first').then(status => expect(status).toBe(2))
  })
})

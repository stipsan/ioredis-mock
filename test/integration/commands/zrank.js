import Redis from 'ioredis'

describe('zrank', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })
  beforeEach(async () => {
    await redis.zadd('foo', 1, 'first', 2, 'second', 3, 'third')
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should do nothing if key does not exist',
    () => {
      return redis
        .zrank('bar', 'not-exist')
        .then(status => expect(status).toBe(null))
        .then(() => expect(redis.data.has('bar')).toBe(false))
    }
  )

  it('should return null if not found', () => {
    return redis
      .zrank('foo', 'not-found')
      .then(status => expect(status).toBe(null))
  })

  it('should return found index', () => {
    return redis.zrank('foo', 'third').then(status => expect(status).toBe(2))
  })
})

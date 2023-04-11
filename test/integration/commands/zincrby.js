import Redis from 'ioredis'

describe('zincrby', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })
  beforeEach(async () => {
    await redis.zadd('foos', 1, 'foo', 2, 'bar', 3, 'baz')
  })
  it('should increment the score of an item in a sorted set', () => {
    return redis
      .zincrby('foos', 10, 'foo')
      .then(status => expect(status).toBe('11'))
      .then(() => {
        if (!process.env.IS_E2E) {
          expect(redis.data.get('foos').get('foo')).toEqual({
            value: 'foo',
            score: 11,
          })
        }
      })
  })
  it('should initialize a non-existent key', () => {
    return redis
      .zincrby('foos', 4, 'qux')
      .then(status => expect(status).toBe('4'))
      .then(() => {
        if (!process.env.IS_E2E) {
          expect(redis.data.get('foos').get('qux')).toEqual({
            value: 'qux',
            score: 4,
          })
        }
      })
  })
})

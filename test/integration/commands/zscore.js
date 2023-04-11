import Redis from 'ioredis'

describe('zscore', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })
  beforeEach(async () => {
    await redis.zadd(
      'foo',
      1,
      'first',
      2,
      'second',
      3,
      'third',
      4,
      'fourth',
      5,
      'fifth'
    )
    await redis.set('bar', 'not a sorted set')
  })

  it('should return the score of an existing member as a string', () => {
    return redis.zscore('foo', 'third').then(res => expect(res).toBe('3'))
  })

  it('should return null when the member does not exist', () => {
    return redis.zscore('foo', 'sixth').then(res => expect(res).toBeFalsy())
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return null when the key is not a sorted set',
    () => {
      return redis.zscore('bar', 'first').then(res => expect(res).toBeFalsy())
    }
  )

  it('should return null when the key does not exist', () => {
    return redis.zscore('baz', 'first').then(res => expect(res).toBeFalsy())
  })
})

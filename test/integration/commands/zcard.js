import Redis from 'ioredis'

describe('zcard', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })

  it('should return the number of items in the sorted set', async () => {
    await redis.zadd('foo', 1, 'one', 3, 'three', 4, 'four')

    return redis.zcard('foo').then(length => expect(length).toBe(3))
  })

  it('should return 0 if the sorted set does not exist', async () => {
    const length = await redis.zcard('foo')
    expect(length).toBe(0)
  })

  // @TODO Skipped because there's a bug in our implementation
  ;(process.env.IS_E2E ? it : it.skip)(
    'should throw an exception if the key contains something other than a sorted set',
    async () => {
      await redis.set('foo', 'not a sorted set')

      return redis
        .zcard('foo')
        .catch(err =>
          expect(err.message).toBe(
            'WRONGTYPE Operation against a key holding the wrong kind of value'
          )
        )
    }
  )
})

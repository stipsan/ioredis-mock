import Redis from 'ioredis'

describe('bgsave', () => {
  it('should return OK', async () => {
    const redis = new Redis()

    expect(await redis.bgsave()).toMatchInlineSnapshot(
      '"Background saving started"'
    )
    redis.disconnect()
  })
})

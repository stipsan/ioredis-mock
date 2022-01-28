import Redis from 'ioredis'

describe('bgrewriteaof', () => {
  it('should return OK', async () => {
    const redis = new Redis()

    expect(await redis.bgrewriteaof()).toMatchInlineSnapshot(
      '"Background append only file rewriting started"'
    )
    redis.disconnect()
  })
})

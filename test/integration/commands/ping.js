import Redis from 'ioredis'

describe('ping', () => {
  it('should return PONG', async () => {
    const redis = new Redis()

    expect(await redis.ping()).toBe('PONG')
    redis.disconnect()
  })

  it('should return message', async () => {
    const redis = new Redis()

    expect(await redis.ping('Hello World!')).toMatchInlineSnapshot(
      '"Hello World!"'
    )
    redis.disconnect()
  })
})

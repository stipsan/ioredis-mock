import Redis from 'ioredis'

describe('echo', () => {
  it('should return message', async () => {
    const redis = new Redis()

    expect(await redis.echo('Hello World!')).toBe('Hello World!')
    redis.disconnect()
  })
})

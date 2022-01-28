import Redis from 'ioredis'

describe('lastsave', () => {
  it('should return unix time since last save', async () => {
    const redis = new Redis()

    expect(await redis.lastsave()).toBeLessThanOrEqual(
      Math.floor(new Date().getTime() / 1000)
    )
    redis.disconnect()
  })
})

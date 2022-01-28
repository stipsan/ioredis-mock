import Redis from 'ioredis'

describe('info', () => {
  it('should return the specific info', async () => {
    const info = `#Server
    redis_version:5.0.7`
    const redis = new Redis({ data: { info } })

    expect(await redis.info()).toEqual(info)
    redis.disconnect()
  })
})

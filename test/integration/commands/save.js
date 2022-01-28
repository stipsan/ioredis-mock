import Redis from 'ioredis'

describe('save', () => {
  it('should return OK', async () => {
    const redis = new Redis()

    expect(await redis.save()).toBe('OK')
    redis.disconnect()
  })
})

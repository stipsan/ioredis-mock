import Redis from 'ioredis'

describe('exists', () => {
  it('should return how many keys exists', async () => {
    const redis = new Redis()
    await redis.set('foo', '1')
    await redis.set('bar', '1')
    expect(await redis.exists('foo', 'bar', 'baz')).toBe(2)
    redis.disconnect()
  })
})

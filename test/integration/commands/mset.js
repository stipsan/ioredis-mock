import Redis from 'ioredis'

describe('mset', () => {
  it('should batch set values', async () => {
    const redis = new Redis()

    expect(await redis.mset('key1', 'Hello', 'key2', 'World')).toBe('OK')
    expect(await redis.get('key1')).toBe('Hello')
    expect(await redis.get('key2')).toBe('World')
    redis.disconnect()
  })
})

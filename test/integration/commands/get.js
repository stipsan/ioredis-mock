import Redis from 'ioredis'

describe('get', () => {
  it('should return null on keys that do not exist', async () => {
    const redis = new Redis()

    expect(await redis.get('foo')).toBe(null)
    redis.disconnect()
  })

  it('should return value of key', async () => {
    const redis = new Redis()
    await redis.set('foo', 'bar')

    expect(await redis.get('foo')).toBe('bar')
    redis.disconnect()
  })
})

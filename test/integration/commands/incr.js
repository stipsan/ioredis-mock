import Redis from 'ioredis'

describe('incr', () => {
  it('should increment an integer', async () => {
    const redis = new Redis()
    await redis.set('user_next', 1)

    expect(await redis.incr('user_next')).toBe(2)
    expect(await redis.get('user_next')).toBe('2')
    redis.disconnect()
  })

  it('should set default value if not exists', async () => {
    const redis = new Redis()

    expect(await redis.incr('user_next')).toBe(1)
    expect(await redis.get('user_next')).toBe('1')
    redis.disconnect()
  })
})

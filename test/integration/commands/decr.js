import Redis from 'ioredis'

describe('decr', () => {
  it('should decrement an integer', async () => {
    const redis = new Redis()
    await redis.set('user_next', '2')

    expect(await redis.decr('user_next')).toBe(1)
    expect(await redis.get('user_next')).toBe('1')
    redis.disconnect()
  })
})

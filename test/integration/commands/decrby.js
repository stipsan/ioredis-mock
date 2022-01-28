import Redis from 'ioredis'

describe('decrby', () => {
  it('should decrement an integer with passed decrement', async () => {
    const redis = new Redis()
    await redis.set('user_next', '11')

    expect(await redis.decrby('user_next', 10)).toBe(1)
    expect(await redis.get('user_next')).toBe('1')
    redis.disconnect()
  })
  it('should throw increment if no decrement is passed', async () => {
    const redis = new Redis({
      data: {
        user_next: '1',
      },
    })
    await redis.set('user_next', '1')

    await expect(() => {
      return redis.decrby('user_next')
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      '"ERR wrong number of arguments for \'decrby\' command"'
    )
    expect(await redis.get('user_next')).toBe('1')
    redis.disconnect()
  })
})

import Redis from 'ioredis'

describe('hmset', () => {
  it('should let you set multiple hash map keys and values in a single command', async () => {
    const redis = new Redis()
    const hash = { id: '1', email: 'bruce@wayne.enterprises' }

    expect(
      await redis.hmset('user:1', 'id', '1', 'email', 'bruce@wayne.enterprises')
    ).toBe('OK')
    expect(await redis.hgetall('user:1')).toEqual(hash)
    redis.disconnect()
  })

  it('should let you set multiple hash map keys and values with an object', async () => {
    const redis = new Redis()
    const hash = { id: '1', email: 'bruce@wayne.enterprises' }

    expect(await redis.hmset('user:1', hash)).toBe('OK')
    expect(await redis.hgetall('user:1')).toEqual(hash)
    redis.disconnect()
  })
})

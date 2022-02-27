import Redis from 'ioredis'

describe('getBuffer', () => {
  it('should return value of a binary set unchanged', async () => {
    const redis = new Redis()
    const value = Buffer.from('1T+HJWDNyTa4jJXwoBbV6Q==', 'base64')
    await redis.set('foo', value)

    expect(await redis.getBuffer('foo')).toEqual(value)
    redis.disconnect()
  })
})

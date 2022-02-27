import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports

describe('getBuffer', () => {
  it('should return value of a binary key unchanged', async () => {
    const redis = new Redis()
    const value = Buffer.from('1T+HJWDNyTa4jJXwoBbV6Q==', 'base64')
    await redis.set('foo', value)

    expect(await redis.getBuffer('foo')).toEqual(value)
    redis.disconnect()
  })
})

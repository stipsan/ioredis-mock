import Redis from 'ioredis'

describe('dbsize', () => {
  it('should return how many keys exists in db', async () => {
    const redis = new Redis()
    await redis.set('foo', 'bar')
    await redis.set('bar', 'foo')

    expect(await redis.dbsize()).toBe(2)
    redis.disconnect()
  })
})

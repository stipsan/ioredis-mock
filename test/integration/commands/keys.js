import Redis from 'ioredis'

describe('keys', () => {
  it('should return an empty array if there are no keys', async () => {
    const redis = new Redis()

    expect(await redis.keys('*')).toEqual([])
    redis.disconnect()
  })

  it('should return all data keys', async () => {
    const redis = new Redis()
    await redis.set('foo', 'bar')
    await redis.set('baz', 'quux')

    expect(await redis.keys('*')).toEqual(['foo', 'baz'])
    redis.disconnect()
  })

  it('should only return keys matching the given pattern', async () => {
    const redis = new Redis()
    await redis.set('foo', 'bar')
    await redis.set('baz', 'quux')
    await redis.set('flambé', 'baked alaska')

    expect(await redis.keys('f*')).toEqual(['foo', 'flambé'])
    redis.disconnect()
  })

  it('should not return empty sets', async () => {
    const redis = new Redis()
    await redis.sadd('a', 'b')
    await redis.srem('a', 'b')

    expect(await redis.keys('*')).toEqual([])
    redis.disconnect()
  })
})

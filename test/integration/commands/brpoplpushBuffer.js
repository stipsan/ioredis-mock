import Redis from 'ioredis'

describe('brpoplpushBuffer', () => {
  it('should remove one item from the tail of the source list', async () => {
    const redis = new Redis()
    await redis.rpush('foo', 'foo', 'bar')

    await redis.brpoplpushBuffer('foo', 'bar', 0)
    expect(await redis.lrange('foo', 0, -1)).toEqual(['foo'])
    redis.disconnect()
  })

  it('should add one item to the head of the destination list', async () => {
    const redis = new Redis()
    await redis.rpush('foo', 'foo', 'bar')
    await redis.rpush('bar', 'baz')

    await redis.brpoplpushBuffer('foo', 'bar', 1)
    expect(await redis.lrange('bar', 0, -1)).toEqual(['bar', 'baz'])
    redis.disconnect()
  })

  it('should return null if the source list does not exist', async () => {
    const redis = new Redis()

    expect(await redis.brpoplpushBuffer('foo', 'bar', 1)).toEqual(null)
    redis.disconnect()
  })

  it('should return null if the source list is empty', async () => {
    const redis = new Redis({ data: { foo: [] } })

    expect(await redis.brpoplpushBuffer('foo', 'bar', 1)).toEqual(null)
    redis.disconnect()
  })

  it('should return the item as buffer', async () => {
    const redis = new Redis()
    await redis.rpush('foo', 'foo', 'bar')

    const item = await redis.brpoplpushBuffer('foo', 'bar', 1)
    expect(Buffer.isBuffer(item)).toBeTruthy()
    expect(item).toEqual(Buffer.from('bar'))
    redis.disconnect()
  })

  it('should return buffer values correctly', async () => {
    const bufferVal = Buffer.from('bar')
    const redis = new Redis()
    await redis.rpush('foo', 'foo', bufferVal)

    expect(await redis.brpoplpushBuffer('foo', bufferVal, 1)).toEqual(bufferVal)
    redis.disconnect()
  })

  it('should throw an exception if the source key contains something other than a list', async () => {
    const redis = new Redis()
    await redis.set('foo', 'not a list')

    await expect(() => {
      return redis.brpoplpushBuffer('foo', 'bar', 1)
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      '"WRONGTYPE Operation against a key holding the wrong kind of value"'
    )
    redis.disconnect()
  })

  it('should throw an exception if the destination key contains something other than a list', async () => {
    const redis = new Redis()
    await redis.set('bar', 'not a list')

    expect(await redis.brpoplpushBuffer('foo', 'bar', 1)).toBe(null)
    redis.disconnect()
  })
})

import Redis from 'ioredis'

describe('zadd', () => {
  const redis = new Redis()

  afterAll(() => {
    redis.disconnect()
  })

  it('should add 1 item to sorted set', async () => {
    const status = await redis.zadd('foos', '1', 'foo')
    expect(status).toBe(1)

    expect(await redis.zrange('foos', 0, -1)).toEqual(['foo'])
  })
  it('should add 2 items to sorted set', async () => {
    const status = await redis.zadd('foos', '1', 'foo', '2', 'baz')
    expect(status).toBe(2)

    expect(await redis.zrange('foos', 0, -1)).toEqual(['foo', 'baz'])
  })
  it('should not increase length when adding duplicates', async () => {
    const status = await redis.zadd('key', '1', 'value', '1', 'value')
    expect(status).toBe(1)

    expect(await redis.zrange('key', 0, -1)).toEqual(['value'])
  })
  it('should not allow nx and xx options in the same call', async () => {
    await expect(redis.zadd('key', ['NX', 'XX'], 1, 'value')).rejects.toThrow(
      'not compatible'
    )
  })
  it('should not update a value that exists with NX option', async () => {
    await redis.zadd('key', 'NX', 1, 'value')
    expect(await redis.zadd('key', 'NX', 2, 'value')).toBe(0)
  })
  it('should return updated + added with CH option', async () => {
    await redis.zadd('key', 1, 'value')
    expect(await redis.zadd('key', 'CH', 3, 'value', 2, 'value2')).toBe(2)
  })
  it('should only update elements that already exist with XX option', async () => {
    await redis.zadd('key', 1, 'value')
    expect(await redis.zadd('key', ['XX', 'CH'], 2, 'value')).toBe(1)
  })
  it('should handle INCR option', async () => {
    await redis.zadd('key', 1, 'value')
    await redis.zadd('key', 'INCR', 2, 'value')

    expect(await redis.zrange('key', 0, -1, 'WITHSCORES')).toEqual([
      'value',
      '3',
    ])
  })
})

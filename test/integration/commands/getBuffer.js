import Redis from 'ioredis'

describe('getBuffer', () => {
  it('should return null on keys that do not exist', async () => {
    const redis = new Redis()

    expect(await redis.getBuffer('foo')).toBe(null)
    redis.disconnect()
  })

  it('should return value of key as buffer', async () => {
    const redis = new Redis()
    await redis.set('foo', 'bar')

    const result = await redis.getBuffer('foo')
    expect(Buffer.isBuffer(result)).toBeTruthy()
    expect(result).toEqual(Buffer.from('bar'))
    redis.disconnect()
  })

  it('should return buffer values correctly', async () => {
    const bufferVal = Buffer.from('bar')
    const redis = new Redis()
    await redis.set('foo', bufferVal)

    const result = await redis.getBuffer('foo')
    expect(result.equals(bufferVal)).toBe(true)
    redis.disconnect()
  })
})

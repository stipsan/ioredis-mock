import Redis from 'ioredis'

describe('set', () => {
  it('should return OK when setting a hash key', async () => {
    const redis = new Redis()

    expect(await redis.set('foo', 'bar')).toBe('OK')
    expect(await redis.get('foo')).toBe('bar')
    redis.disconnect()
  })

  it('should turn number to string', async () => {
    const redis = new Redis()

    expect(await redis.set('foo', 1.5)).toBe('OK')
    expect(await redis.get('foo')).toBe('1.5')
    redis.disconnect()
  })

  it('should set empty value if null', async () => {
    const redis = new Redis()

    expect(await redis.set('foo', null)).toBe('OK')
    expect(await redis.get('foo')).toBe('')
    redis.disconnect()
  })

  it('should set value and expire', async () => {
    const redis = new Redis()

    expect(await redis.set('foo', 'bar', 'EX', 10)).toBe('OK')
    expect(await redis.get('foo')).toBe('bar')
    expect(await redis.ttl('foo')).toBeGreaterThanOrEqual(1)
    redis.disconnect()
  })

  it('should throw an exception if both NX and XX are specified', async () => {
    const redis = new Redis()

    await expect(() => {
      return redis.set('foo', 1, 'NX', 'XX')
    }).rejects.toThrow('ERR syntax error')
    redis.disconnect()
  })

  it('should return null if XX is specified and the key does not exist', async () => {
    const redis = new Redis()

    expect(await redis.set('foo', 1, 'XX')).toBe(null)
    redis.disconnect()
  })

  it('should return null if NX is specified and the key already exists', async () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
      },
    })
    await redis.set('foo', 'bar')

    expect(await redis.set('foo', 1, 'NX')).toBe(null)
    redis.disconnect()
  })
})

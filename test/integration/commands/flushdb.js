import Redis from 'ioredis'

describe('flushdb', () => {
  test('should empty current db', async () => {
    const redis = new Redis()
    await redis.set('deleteme', 'please')
    await redis.set('metoo', 'pretty please')

    expect(await redis.flushdb()).toBe('OK')

    expect(await redis.get('deleteme')).toBe(null)
    expect(await redis.get('metoo')).toBe(null)
    redis.disconnect()
  })
  test('should stay in sync cross instances', async () => {
    const redis1 = new Redis()
    const redis2 = new Redis()

    await redis1.set('foo', 'bar')
    expect(await redis1.get('foo')).toBe('bar')
    expect(await redis2.get('foo')).toBe('bar')

    await redis1.flushdb()
    expect(await redis1.get('foo')).toBe(null)
    expect(await redis2.get('foo')).toBe(null)

    await redis1.set('foo', 'bloop')
    expect(await redis1.get('foo')).toBe('bloop')
    expect(await redis2.get('foo')).toBe('bloop')

    redis1.disconnect()
    redis2.disconnect()
  })
})

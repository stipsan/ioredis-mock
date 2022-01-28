import Redis from 'ioredis'

describe('getrange', () => {
  const redis = new Redis()

  afterAll(() => {
    redis.disconnect()
  })

  it('should return "This"', async () => {
    await redis.set('foo', 'This is a string')
    expect(await redis.getrange('foo', 0, 3)).toBe('This')
  })

  it('should return "ing"', async () => {
    await redis.set('foo', 'This is a string')
    expect(await redis.getrange('foo', -3, -1)).toBe('ing')
  })

  it('should return "This is a string"', async () => {
    await redis.set('foo', 'This is a string')
    expect(await redis.getrange('foo', 0, -1)).toBe('This is a string')
  })

  it('should return "string"', async () => {
    await redis.set('foo', 'This is a string')
    expect(await redis.getrange('foo', 10, 100)).toBe('string')
  })
})

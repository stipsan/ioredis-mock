import Redis from 'ioredis'

describe('duplicate', () => {
  it('prerequisites', () => {
    const redis = new Redis()
    expect(redis.options.lazyConnect).toBe(false)
    return redis.disconnect()
  })
  it('should preserve options', () => {
    const redis = new Redis({ lazyConnect: true })
    const redis2 = redis.duplicate()
    expect(redis2.options.lazyConnect).toBe(true)
    return Promise.all([redis.disconnect(), redis2.disconnect()])
  })
  it('should handle overrides', () => {
    const redis = new Redis({ lazyConnect: true })
    const redis2 = redis.duplicate({ lazyConnect: false })
    expect(redis2.options.lazyConnect).toBe(false)
    return Promise.all([redis.disconnect(), redis2.disconnect()])
  })
})

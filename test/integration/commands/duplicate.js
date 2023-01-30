import Redis from 'ioredis'

describe('duplicate', () => {
  it('prerequisites', () => {
    expect(new Redis().options.lazyConnect).toBe(false)
  })
  it('should preserve options', () => {
    const redis = new Redis({ lazyConnect: true })
    expect(redis.duplicate().options.lazyConnect).toBe(true)
  })
  it('should handle overrides', () => {
    const redis = new Redis({ lazyConnect: true })
    expect(redis.duplicate({ lazyConnect: false }).options.lazyConnect).toBe(false)
  })
})

import Redis from 'ioredis'

describe('duplicate', () => {
  it('prerequisites', () => {
    expect(new Redis().options.lazyConnect).toBe(false)
  })
  it('should preserve options', () => {
    let redis = new Redis({ lazyConnect: true })
    expect(redis.duplicate().options.lazyConnect).toBe(true)
  })
  it('should handle overrides', () => {
    let redis = new Redis({ lazyConnect: true })
    expect(redis.duplicate({ lazyConnect: false }).options.lazyConnect).toBe(false)
  })
})

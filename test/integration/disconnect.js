import Redis from 'ioredis'

describe('disconnect', () => {
  it('should be available, but do nothing', () => {
    const redis = new Redis({})
    expect(redis.disconnect()).toBe(undefined)
  })
})

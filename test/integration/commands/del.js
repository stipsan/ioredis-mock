import Redis from 'ioredis'

describe('del', () => {
  it('should delete passed in keys', async () => {
    const redis = new Redis()
    await redis.set('deleteme', 'please')
    await redis.set('metoo', 'pretty please')

    expect(await redis.del('deleteme', 'metoo')).toBe(2)
    expect(await redis.get('deleteme')).toBe(null)
    expect(await redis.get('metoo')).toBe(null)
    redis.disconnect()
  })
  it('return 0 if nothing is deleted', async () => {
    const redis = new Redis()

    expect(await redis.del('deleteme', 'metoo')).toBe(0)
    redis.disconnect()
  })
})

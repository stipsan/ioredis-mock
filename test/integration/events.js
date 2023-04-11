import Redis from 'ioredis'

describe('events', () => {
  it('should trigger ready and connect events on instantiation', async () => {
    const redis = new Redis()

    await Promise.all([
      new Promise(resolve => redis.once('ready', resolve)),
      new Promise(resolve => redis.once('connect', resolve)),
    ])

    return redis.disconnect()
  })
})

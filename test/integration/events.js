import Redis from 'ioredis'

describe('events', () => {
  it('should trigger ready and connect events on instantiation', () => {
    const redis = new Redis()

    return Promise.all([
      new Promise(resolve => redis.once('ready', resolve)),
      new Promise(resolve => redis.once('connect', resolve)),
    ])
  })
})

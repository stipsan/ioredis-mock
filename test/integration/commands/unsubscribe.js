import Redis from 'ioredis'

describe('unsubscribe', () => {
  it('should return 0 when no arguments are given', async () => {
    const redis = new Redis()
    // unsubscribe returns the number of open channels (like subscribe)
    // unsubscribe() should always return 0, as we have unsubscribed from all channels
    expect(await redis.unsubscribe()).toBe(0)
    redis.disconnect()
  })

  it('should return 0 when no arguments are given after being subscribed to a channel', async () => {
    const redis = new Redis()
    expect(await redis.subscribe('first')).toBe(1)
    expect(await redis.unsubscribe()).toBe(0)
    redis.disconnect()
  })

  it('should return the number of subscribed channels when unsubscribing from a subscribed channel', async () => {
    const redis = new Redis()
    expect(await redis.subscribe('first', 'second', 'third')).toBe(3)
    expect(await redis.unsubscribe('second', 'third')).toBe(1)
    // @TODO isn't needed by test:e2e, but is needed by test:integration
    await redis.unsubscribe()
    redis.disconnect()
  })

  it('should ignore a request to unsubscribe from a channel not subscribed to', async () => {
    const redis = new Redis()
    await redis.subscribe('first')
    expect(await redis.unsubscribe('second')).toBe(1)
    // @TODO isn't needed by test:e2e, but is needed by test:integration
    await redis.unsubscribe()
    redis.disconnect()
  })

  it('should unsubscribe only one instance when more than one is subscribed to a channel', async () => {
    const redisOne = new Redis()
    const redisTwo = new Redis()

    await Promise.all([
      redisOne.subscribe('first'),
      redisTwo.subscribe('first', 'second'),
    ])

    expect(await redisTwo.unsubscribe('first')).toEqual(1)

    let promiseFulfill
    const promise = new Promise(f => {
      promiseFulfill = f
    })

    redisOne.on('message', promiseFulfill)

    redisOne.duplicate().publish('first', 'TEST')

    await promise

    // @TODO isn't needed by test:e2e, but is needed by test:integration
    await redisOne.unsubscribe()
    await redisTwo.unsubscribe()

    redisOne.disconnect()
    redisTwo.disconnect()
  })

  it('should not alter parent instance when connected client unsubscribes', async () => {
    const redisOne = new Redis()
    const redisTwo = new Redis()

    await redisOne.subscribe('first')
    expect(await redisTwo.unsubscribe('first')).toBe(0)
    expect(await redisTwo.publish('first', '')).toBe(1)

    // @TODO isn't needed by test:e2e, but is needed by test:integration
    await redisOne.unsubscribe()
    await redisTwo.unsubscribe()

    redisOne.disconnect()
    redisTwo.disconnect()
  })
})

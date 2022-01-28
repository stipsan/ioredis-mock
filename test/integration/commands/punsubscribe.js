import Redis from 'ioredis'

describe('punsubscribe', () => {
  it('should return 0 when no arguments are given', async () => {
    const redis = new Redis()
    // unsubscribe returns the number of open channels (like subscribe)
    // unsubscribe() should always return 0, as we have unsubscribed from all channels
    expect(await redis.punsubscribe()).toBe(0)
    redis.disconnect()
  })

  it('should return 0 when no arguments are given after being subscribed to a channel', async () => {
    const redis = new Redis()
    expect(await redis.psubscribe('first')).toBe(1)
    expect(await redis.punsubscribe()).toBe(0)

    redis.disconnect()
  })

  it('should return the number of subscribed channels when unsubscribing from a subscribed channel', async () => {
    const redis = new Redis()
    expect(await redis.psubscribe('first.*', 'second.*', 'third.*')).toBe(3)
    expect(await redis.punsubscribe('second.*', 'third.*')).toBe(1)
    redis.disconnect()
  })

  it('should not return an error if unsubscribing from a channel with no subscriptions', async () => {
    const redis = new Redis()
    expect(await redis.punsubscribe('fourth.*')).toBe(0)
    redis.disconnect()
  })

  it('should unsubscribe only one instance when more than one is subscribed to a channel', async () => {
    const redisOne = new Redis()
    const redisTwo = new Redis()

    await Promise.all([
      redisOne.psubscribe('first.*'),
      redisTwo.psubscribe('first.*', 'second.*'),
    ])

    expect(await redisTwo.punsubscribe('first.*')).toEqual(1)

    let promiseFulfill
    const promise = new Promise(f => {
      promiseFulfill = f
    })

    redisOne.on('pmessage', promiseFulfill)

    redisOne.duplicate().publish('first.test', 'TEST')

    await promise

    redisOne.disconnect()
    redisTwo.disconnect()
  })
})

import Redis from 'ioredis'

describe('disconnect', () => {
  it('should be available and emit "end" and "close" events', async () => {
    const redis = new Redis({})
    const events = []
    redis.on('close', () => events.push('close'))
    redis.on('end', () => events.push('end'))

    expect(redis.disconnect()).toBe(undefined)

    await new Promise(resolve => setImmediate(resolve));

    expect(events).toEqual(['close', 'end'])
  })
})

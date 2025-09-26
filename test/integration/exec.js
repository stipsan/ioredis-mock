import Redis from 'ioredis'

describe('exec', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })
  beforeEach(async () => {
    await redis.set('user_next', '1')
    await redis.set('post_next', '1')
  })

  it('should resolve Promise.all after all operations is done', async () => {
    const results = await redis
      .multi([
        ['incr', 'user_next'],
        ['incr', 'post_next'],
      ])
      .exec()

    expect(results).toEqual([
      [null, 2],
      [null, 2],
    ])
  })

  it('should support a callback function', async () => {
    await redis
      .multi([
        ['incr', 'user_next'],
        ['incr', 'post_next'],
      ])
      .exec((err, results) => {
        expect(results).toEqual([
          [null, 2],
          [null, 2],
        ])
      })
  })

  it('should return null if some watched keys have expired', async () => {
    await redis.expire('user_next', 1)
    await redis.watch('user_next')
    await new Promise(resolve => setTimeout(resolve, 1500))
    const results = await redis
      .multi([
        ['incr', 'user_next'],
        ['incr', 'post_next'],
      ])
      .exec()
    expect(results).toEqual(null)
  })

  it('should return null if some watched keys have changed', async () => {
    const redis2 = redis.duplicate()
    await redis.watch('user_next')
    await redis2.incr('user_next')
    const results = await redis
      .multi([
        ['incr', 'user_next'],
        ['incr', 'post_next'],
      ])
      .exec()
    expect(results).toEqual(null)
    expect(await redis.get('user_next')).toBe('2')
    redis2.disconnect()
  })

  it('should allow unwatching before calling exec', async () => {
    const redis2 = redis.duplicate()
    await redis.watch('user_next')
    await redis2.incr('user_next') // dirty
    await redis.unwatch() // no longer dirty
    const results = await redis
      .multi([
        ['incr', 'user_next'],
        ['incr', 'post_next'],
      ])
      .exec()
    expect(results).toEqual([
      [null, 3],
      [null, 2],
    ])
    redis2.disconnect()
  })
})

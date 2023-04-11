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

  it('should support a callback function', done => {
    redis
      .multi([
        ['incr', 'user_next'],
        ['incr', 'post_next'],
      ])
      .exec((err, results) => {
        expect(results).toEqual([
          [null, 2],
          [null, 2],
        ])
        done()
      })
  })
})

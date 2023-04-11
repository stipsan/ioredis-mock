import Redis from 'ioredis'

describe('exec', () => {
  beforeEach(async () => {
    const redis = new Redis()
    await redis.set('user_next', '1')
    await redis.set('post_next', '1')
  })
  it('should resolve Promise.all after all operations is done', async () => {
    const redis = new Redis()

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
    const redis = new Redis()

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

import Redis from 'ioredis'

describe('zremrangebyrank', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
  }

  it('should do nothing if key does not exist', () => {
    const redis = new Redis({ data: {} })

    return redis
      .zremrangebyrank('foo', 0, 2)
      .then(status => expect(status).toBe(0))
      .then(() => expect(redis.data.has('foo')).toBe(false))
  })

  it('should remove first 3 items ordered by score', () => {
    const redis = new Redis({ data })

    return redis
      .zremrangebyrank('foo', 0, 2)
      .then(status => expect(status).toBe(3))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(false)
        expect(redis.data.get('foo').has('second')).toBe(false)
        expect(redis.data.get('foo').has('third')).toBe(false)
        expect(redis.data.get('foo').has('fourth')).toBe(true)
        expect(redis.data.get('foo').has('fifth')).toBe(true)
      })
  })

  it('should remove last 3 items', () => {
    const redis = new Redis({ data })

    return redis
      .zremrangebyrank('foo', -3, -1)
      .then(status => expect(status).toBe(3))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(true)
        expect(redis.data.get('foo').has('second')).toBe(true)
        expect(redis.data.get('foo').has('third')).toBe(false)
        expect(redis.data.get('foo').has('fourth')).toBe(false)
        expect(redis.data.get('foo').has('fifth')).toBe(false)
      })
  })

  it('should remove all items on larger rangers', () => {
    const redis = new Redis({ data })

    return redis
      .zremrangebyrank('foo', 0, 100)
      .then(status => expect(status).toBe(5))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(false)
        expect(redis.data.get('foo').has('second')).toBe(false)
        expect(redis.data.get('foo').has('third')).toBe(false)
        expect(redis.data.get('foo').has('fourth')).toBe(false)
        expect(redis.data.get('foo').has('fifth')).toBe(false)
      })
  })

  it('should return 0 and delete nothing if out-of-range', () => {
    const redis = new Redis({ data })

    return redis
      .zremrangebyrank('foo', 10, 100)
      .then(status => expect(status).toBe(0))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(true)
        expect(redis.data.get('foo').has('second')).toBe(true)
        expect(redis.data.get('foo').has('third')).toBe(true)
        expect(redis.data.get('foo').has('fourth')).toBe(true)
        expect(redis.data.get('foo').has('fifth')).toBe(true)
      })
  })

  it('should remove nothing if max is before min', () => {
    const redis = new Redis({ data })

    return redis
      .zremrangebyrank('foo', 0, -6)
      .then(status => expect(status).toBe(0))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(true)
        expect(redis.data.get('foo').has('second')).toBe(true)
        expect(redis.data.get('foo').has('third')).toBe(true)
        expect(redis.data.get('foo').has('fourth')).toBe(true)
        expect(redis.data.get('foo').has('fifth')).toBe(true)
      })
  })

  it('should throw WRONGTYPE if the key contains something other than a list', async () => {
    expect.assertions(1)
    const redis = new Redis()
    await redis.set('foo', 'not a list')

    return redis
      .zremrangebyrank('foo', 0, 2)
      .catch(err =>
        expect(err.message).toBe(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      )
  })
})

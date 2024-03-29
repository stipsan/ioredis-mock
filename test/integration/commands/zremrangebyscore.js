import Redis from 'ioredis'

describe('zremrangebyscore', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })

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
    return redis
      .zremrangebyscore('bar', 0, 2)
      .then(status => expect(status).toBe(0))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should remove using not strict compare',
    () => {
      const redis = new Redis({ data })

      return redis
        .zremrangebyscore('foo', 1, 3)
        .then(res => expect(res).toBe(3))
        .then(() => {
          expect(redis.data.get('foo').has('first')).toBe(false)
          expect(redis.data.get('foo').has('second')).toBe(false)
          expect(redis.data.get('foo').has('third')).toBe(false)
          expect(redis.data.get('foo').has('fourth')).toBe(true)
          expect(redis.data.get('foo').has('fifth')).toBe(true)
        })
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return using strict compare',
    () => {
      const redis = new Redis({ data })

      return redis
        .zremrangebyscore('foo', '(3', 5)
        .then(res => expect(res).toEqual(2))
        .then(() => {
          expect(redis.data.get('foo').has('first')).toBe(true)
          expect(redis.data.get('foo').has('second')).toBe(true)
          expect(redis.data.get('foo').has('third')).toBe(true)
          expect(redis.data.get('foo').has('fourth')).toBe(false)
          expect(redis.data.get('foo').has('fifth')).toBe(false)
        })
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should accept infinity string', () => {
    const redis = new Redis({ data })

    return redis
      .zremrangebyscore('foo', '-inf', '+inf')
      .then(res => expect(res).toEqual(5))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(false)
        expect(redis.data.get('foo').has('second')).toBe(false)
        expect(redis.data.get('foo').has('third')).toBe(false)
        expect(redis.data.get('foo').has('fourth')).toBe(false)
        expect(redis.data.get('foo').has('fifth')).toBe(false)
      })
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return zero if out-of-range',
    () => {
      const redis = new Redis({ data })

      return redis
        .zremrangebyscore('foo', 100, 10)
        .then(res => expect(res).toEqual(0))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return zero if key not found',
    () => {
      const redis = new Redis({ data })

      return redis
        .zremrangebyscore('boo', 100, 10)
        .then(res => expect(res).toEqual(0))
    }
  )

  it('should throw WRONGTYPE if the key contains something other than a list', async () => {
    expect.assertions(1)
    await redis.set('foo', 'not a list')

    return redis
      .zremrangebyscore('foo', 2, 1)
      .catch(err =>
        expect(err.message).toBe(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      )
  })
})

import Redis from 'ioredis'

describe('zrangebyscore', () => {
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
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return using not strict compare',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrangebyscore('foo', 1, 3)
        .then(res => expect(res).toEqual(['first', 'second', 'third']))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return using strict compare',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrangebyscore('foo', '(3', 5)
        .then(res => expect(res).toEqual(['fourth', 'fifth']))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should accept infinity string', () => {
    const redis = new Redis({ data })

    return redis
      .zrangebyscore('foo', '-inf', '+inf')
      .then(res =>
        expect(res).toEqual(['first', 'second', 'third', 'fourth', 'fifth'])
      )
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return empty array if out-of-range',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrangebyscore('foo', 10, 100)
        .then(res => expect(res).toEqual([]))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return empty array if key not found',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrangebyscore('boo', 10, 100)
        .then(res => expect(res).toEqual([]))
    }
  )

  it('should throw WRONGTYPE if the key contains something other than a list', async () => {
    expect.assertions(1)

    await redis.set('foo', 'not a list')

    return redis
      .zrangebyscore('foo', 1, 2)
      .catch(err =>
        expect(err.message).toBe(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      )
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should include scores if WITHSCORES is specified',
    () => {
      const redis = new Redis({ data })
      return redis
        .zrangebyscore('foo', 1, 3, 'WITHSCORES')
        .then(res =>
          expect(res).toEqual(['first', '1', 'second', '2', 'third', '3'])
        )
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should sort items with the same score lexicographically',
    () => {
      const redis = new Redis({
        data: {
          foo: new Map([
            ['aaa', { score: 5, value: 'aaa' }],
            ['ccc', { score: 4, value: 'ccc' }],
            ['ddd', { score: 4, value: 'ddd' }],
            ['bbb', { score: 4, value: 'bbb' }],
          ]),
        },
      })

      return redis
        .zrangebyscore('foo', '-inf', '+inf', 'WITHSCORES')
        .then(res =>
          expect(res).toEqual(['bbb', '4', 'ccc', '4', 'ddd', '4', 'aaa', '5'])
        )
    }
  )
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle offset and limit (0,1)',
    () => {
      const redis = new Redis({ data })
      return redis
        .zrangebyscore('foo', 1, 3, 'LIMIT', 0, 1)
        .then(res => expect(res).toEqual(['first']))
    }
  )
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle offset and limit (1,2)',
    () => {
      const redis = new Redis({ data })
      return redis
        .zrangebyscore('foo', 1, 3, 'LIMIT', 1, 2)
        .then(res => expect(res).toEqual(['second', 'third']))
    }
  )
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle offset, limit, and WITHSCORES',
    () => {
      const redis = new Redis({ data })
      return redis
        .zrangebyscore('foo', 1, 3, 'WITHSCORES', 'LIMIT', 1, 1)
        .then(res => expect(res).toEqual(['second', '2']))
    }
  )
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle LIMIT specified before WITHSCORES',
    () => {
      const redis = new Redis({ data })
      return redis
        .zrangebyscore('foo', 1, 3, 'LIMIT', 1, 1, 'WITHSCORES')
        .then(res => expect(res).toEqual(['second', '2']))
    }
  )
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle LIMIT of -1', () => {
    const redis = new Redis({ data })
    return redis
      .zrangebyscore('foo', '-inf', '+inf', 'LIMIT', 1, -1)
      .then(res => expect(res).toEqual(['second', 'third', 'fourth']))
  })
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle LIMIT of -1 and WITHSCORES',
    () => {
      const redis = new Redis({ data })
      return redis
        .zrangebyscore('foo', '-inf', '+inf', 'LIMIT', 1, -1, 'WITHSCORES')
        .then(res =>
          expect(res).toEqual(['second', '2', 'third', '3', 'fourth', '4'])
        )
    }
  )
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle LIMIT of -2', () => {
    const redis = new Redis({ data })
    return redis
      .zrangebyscore('foo', '-inf', '+inf', 'LIMIT', 1, -2)
      .then(res => expect(res).toEqual(['second', 'third']))
  })
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle LIMIT of 0', () => {
    const redis = new Redis({ data })
    return redis
      .zrangebyscore('foo', '-inf', '+inf', 'LIMIT', 1, 0)
      .then(res => expect(res).toEqual([]))
  })
})

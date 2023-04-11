import Redis from 'ioredis'

describe('zrange', () => {
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
    'should return first 3 items ordered by score',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrange('foo', 0, 2)
        .then(res => expect(res).toEqual(['first', 'second', 'third']))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return nothing when min > max',
    () => {
      const redis = new Redis({ data })

      return redis.zrange('foo', 2, 0).then(res => expect(res).toEqual([]))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return nothing if the min is greater than the max, and max is negative',
    () => {
      const redis = new Redis({ data })

      return redis.zrange('foo', 0, -8).then(res => expect(res).toEqual([]))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should return last 3 items', () => {
    const redis = new Redis({ data })

    return redis
      .zrange('foo', -3, -1)
      .then(res => expect(res).toEqual(['third', 'fourth', 'fifth']))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return all items on larger ranges',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrange('foo', 0, 100)
        .then(res =>
          expect(res).toEqual(['first', 'second', 'third', 'fourth', 'fifth'])
        )
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should work even if the min is negative and larger than set size',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrange('foo', -200, -3)
        .then(res => expect(res).toEqual(['first', 'second', 'third']))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return empty array if out-of-range',
    () => {
      const redis = new Redis({ data })

      return redis.zrange('foo', 10, 100).then(res => expect(res).toEqual([]))
    }
  )

  it('should throw WRONGTYPE if the key contains something other than a list', async () => {
    expect.assertions(1)

    await redis.set('foo', 'not a list')

    return redis
      .zrange('foo', 0, 2)
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
        .zrange('foo', 0, 2, 'WITHSCORES')
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
        .zrange('foo', 0, 100)
        .then(res => expect(res).toEqual(['bbb', 'ccc', 'ddd', 'aaa']))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle REV', () => {
    const redis = new Redis({ data })

    return redis.zrange('foo', 0, 2, 'REV').then(res => {
      expect(res).toEqual(['fifth', 'fourth', 'third'])
    })
  })
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle REV WITHSCORES', () => {
    const redis = new Redis({ data })

    return redis.zrange('foo', 0, 2, 'REV', 'WITHSCORES').then(res => {
      expect(res).toEqual(['fifth', '5', 'fourth', '4', 'third', '3'])
    })
  })
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle BYSCORE', () => {
    const redis = new Redis({ data })

    return redis
      .zrange('foo', 2, '(4', 'BYSCORE')
      .then(res => expect(res).toEqual(['second', 'third']))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle BYSCORE with LIMIT',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrange('foo', 2, '(4', 'BYSCORE', 'LIMIT', 1, 2)
        .then(res => expect(res).toEqual(['third']))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle BYSCORE with LIMIT WITHSCORES',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrange('foo', 2, '(4', 'BYSCORE', 'LIMIT', 1, 2, 'WITHSCORES')
        .then(res => expect(res).toEqual(['third', '3']))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle BYSCORE REV', () => {
    const redis = new Redis({ data })

    return redis
      .zrange('foo', '3', '1', 'BYSCORE', 'REV')
      .then(res => expect(res).toEqual(['third', 'second', 'first']))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle BYSCORE REV WITHSCORES',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrange('foo', '3', '1', 'BYSCORE', 'REV', 'WITHSCORES')
        .then(res =>
          expect(res).toEqual(['third', '3', 'second', '2', 'first', '1'])
        )
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle BYSCORE REV with LIMIT',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrange('foo', '3', '1', 'BYSCORE', 'REV', 'LIMIT', 0, 1)
        .then(res => expect(res).toEqual(['third']))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle BYSCORE REV with LIMIT WITHSCORES',
    () => {
      const redis = new Redis({ data })

      return redis
        .zrange('foo', '3', '1', 'BYSCORE', 'REV', 'LIMIT', 0, 1, 'WITHSCORES')
        .then(res => expect(res).toEqual(['third', '3']))
    }
  )

  const lexData = {
    foo: new Map([
      ['a', { score: 100, value: 'a' }],
      ['b', { score: 100, value: 'b' }],
      ['c', { score: 100, value: 'c' }],
      ['d', { score: 100, value: 'd' }],
      ['e', { score: 100, value: 'e' }],
    ]),
  }

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle BYLEX', () => {
    const redis = new Redis({ data: lexData })

    return redis
      .zrange('foo', '[b', '(d', 'BYLEX')
      .then(res => expect(res).toEqual(['b', 'c']))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle BYLEX with LIMIT', () => {
    const redis = new Redis({ data: lexData })

    return redis
      .zrange('foo', '[b', '(d', 'BYLEX', 'LIMIT', 1, 2)
      .then(res => expect(res).toEqual(['c']))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should handle BYLEX REV', () => {
    const redis = new Redis({ data: lexData })

    return redis
      .zrange('foo', '[c', '[a', 'BYLEX', 'REV')
      .then(res => expect(res).toEqual(['c', 'b', 'a']))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should handle BYLEX REV with LIMIT',
    () => {
      const redis = new Redis({ data: lexData })

      return redis
        .zrange('foo', '[c', '[a', 'BYLEX', 'REV', 'LIMIT', 0, 1)
        .then(res => expect(res).toEqual(['c']))
    }
  )
})

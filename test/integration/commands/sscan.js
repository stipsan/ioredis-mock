import Redis from 'ioredis'

describe('sscan', () => {
  let redis

  afterEach(() => {
    if (redis) {
      redis.disconnect()
      redis = null
    }
  })

  it('should return null array if set does not exist', () => {
    redis = new Redis()
    return redis.sscan('key', 0).then(result => {
      expect(result[0]).toBe('0')
      expect(result[1]).toEqual([])
    })
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should return keys in set', () => {
    redis = new Redis({
      data: {
        set: new Set(['foo', 'bar', 'baz']),
      },
    })

    return redis.sscan('set', 0).then(result => {
      expect(result[0]).toBe('0')
      expect(result[1]).toEqual(['foo', 'bar', 'baz'])
    })
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return only mathced keys',
    () => {
      redis = new Redis({
        data: {
          set: new Set(['foo0', 'foo1', 'foo2', 'ZU0', 'ZU1']),
        },
      })

      return redis.sscan('set', 0, 'MATCH', 'foo*').then(result => {
        expect(result[0]).toBe('0')
        expect(result[1]).toEqual(['foo0', 'foo1', 'foo2'])
      })
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return only mathced keys and limit by COUNT',
    () => {
      redis = new Redis({
        data: {
          set: new Set(['foo0', 'foo1', 'foo2', 'ZU0', 'ZU1']),
        },
      })

      return redis
        .sscan('set', 0, 'MATCH', 'foo*', 'COUNT', 1)
        .then(result => {
          expect(result[0]).toBe('1') // more elements left, this is why cursor is not 0
          expect(result[1]).toEqual(['foo0'])
          return redis.sscan('set', result[0], 'MATCH', 'foo*', 'COUNT', 10)
        })
        .then(result2 => {
          expect(result2[0]).toBe('0')
          expect(result2[1]).toEqual(['foo1', 'foo2'])
        })
    }
  )

  // @TODO: figure out why this test mismatches on redis v5 compared to v4 and the mock
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return number of keys set by COUNT and continue by cursor',
    () => {
      redis = new Redis({
        data: {
          set: new Set(['foo0', 'foo1', 'bar0', 'bar1']),
        },
      })

      return redis
        .sscan('set', 0, 'COUNT', 3)
        .then(result => {
          // @TODO: figure out why this returns '1' on a real instance of redis v5
          expect(result[0]).toBe(process.env.IS_E2E ? '1' : '3')
          expect(result[1]).toEqual(['foo0', 'foo1', 'bar0'])
          return redis.sscan('set', result[0], 'COUNT', 3)
        })
        .then(result2 => {
          expect(result2[0]).toBe('0')
          expect(result2[1]).toEqual(['bar1'])
        })
    }
  )

  it('should fail if incorrect cursor', () => {
    redis = new Redis()
    return redis.sscan('key', 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if incorrect command', () => {
    redis = new Redis()
    return redis.sscan('key', 0, 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if incorrect MATCH usage', () => {
    redis = new Redis()
    return redis.sscan('key', 0, 'MATCH', 'pattern', 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if incorrect COUNT usage', () => {
    redis = new Redis()
    return redis.sscan('key', 0, 'COUNT', 10, 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if incorrect COUNT usage 2', () => {
    redis = new Redis()
    return redis.sscan('key', 0, 'COUNT', 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if too many arguments', () => {
    redis = new Redis()
    return redis
      .sscan('key', 0, 'MATCH', 'foo*', 'COUNT', 1, 'ZU')
      .catch(result => {
        expect(result).toBeInstanceOf(Error)
        expect(result.message).toEqual('Too many arguments')
      })
  })

  it('should fail if arguments length not odd', () => {
    redis = new Redis()
    return redis.sscan('key', 0, 'MATCH', 'foo*', 'COUNT').catch(result => {
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toEqual(
        'Args should be provided by pair (name & value)'
      )
    })
  })
})

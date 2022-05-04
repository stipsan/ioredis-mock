import Redis from 'ioredis'

describe('zscan', () => {
  function createMap(keys) {
    return new Map(keys.map(k => [k, { score: 0, value: k }]))
  }

  it('should return null array if zset does not exist', () => {
    const redis = new Redis()
    return redis.zscan('key', 0).then(result => {
      expect(result[0]).toBe('0')
      expect(result[1]).toEqual([])
    })
  })

  it('should return keys in zset', () => {
    const redis = new Redis({
      data: {
        zset: createMap(['foo', 'bar', 'baz']),
      },
    })

    return redis.zscan('zset', 0).then(result => {
      expect(result[0]).toBe('0')
      expect(result[1]).toEqual(['foo', '0', 'bar', '0', 'baz', '0'])
    })
  })

  it('should return only matched keys', () => {
    const redis = new Redis({
      data: {
        zset: createMap(['foo0', 'foo1', 'foo2', 'ZU0', 'ZU1']),
      },
    })

    return redis.zscan('zset', 0, 'MATCH', 'foo*').then(result => {
      expect(result[0]).toBe('0')
      expect(result[1]).toEqual(['foo0', '0', 'foo1', '0', 'foo2', '0'])
    })
  })

  it('should return only matched keys and limit by COUNT', () => {
    const redis = new Redis({
      data: {
        zset: createMap(['foo0', 'foo1', 'foo2', 'ZU0', 'ZU1']),
      },
    })

    return redis
      .zscan('zset', 0, 'MATCH', 'foo*', 'COUNT', 1)
      .then(result => {
        expect(result[0]).toBe('1') // more elements left, this is why cursor is not 0
        expect(result[1]).toEqual(['foo0', '0'])
        return redis.zscan('zset', result[0], 'MATCH', 'foo*', 'COUNT', 10)
      })
      .then(result2 => {
        expect(result2[0]).toBe('0')
        expect(result2[1]).toEqual(['foo1', '0', 'foo2', '0'])
      })
  })

  it('should return number of keys zset by COUNT and continue by cursor', () => {
    const redis = new Redis({
      data: {
        zset: createMap(['foo0', 'foo1', 'bar0', 'bar1']),
      },
    })

    return redis
      .zscan('zset', 0, 'COUNT', 3)
      .then(result => {
        expect(result[0]).toBe('3')
        expect(result[1]).toEqual(['foo0', '0', 'foo1', '0', 'bar0', '0'])
        return redis.zscan('zset', result[0], 'COUNT', 3)
      })
      .then(result2 => {
        expect(result2[0]).toBe('0')
        expect(result2[1]).toEqual(['bar1', '0'])
      })
  })

  it('should fail if incorrect cursor', () => {
    const redis = new Redis()
    return redis.zscan('key', 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if incorrect command', () => {
    const redis = new Redis()
    return redis.zscan('key', 0, 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if incorrect MATCH usage', () => {
    const redis = new Redis()
    return redis.zscan('key', 0, 'MATCH', 'pattern', 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if incorrect COUNT usage', () => {
    const redis = new Redis()
    return redis.zscan('key', 0, 'COUNT', 10, 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if incorrect COUNT usage 2', () => {
    const redis = new Redis()
    return redis.zscan('key', 0, 'COUNT', 'ZU').catch(result => {
      expect(result).toBeInstanceOf(Error)
    })
  })
  it('should fail if too many arguments', () => {
    const redis = new Redis()
    return redis
      .zscan('key', 0, 'MATCH', 'foo*', 'COUNT', 1, 'ZU')
      .catch(result => {
        expect(result).toBeInstanceOf(Error)
        expect(result.message).toEqual('Too many arguments')
      })
  })

  it('should fail if arguments length not odd', () => {
    const redis = new Redis()
    return redis.zscan('key', 0, 'MATCH', 'foo*', 'COUNT').catch(result => {
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toEqual(
        'Args should be provided by pair (name & value)'
      )
    })
  })

  it('should match ioredis behaviour', done => {
    const redis = new Redis()
    redis.zadd('test', 1, 'a', 2, 'b', 3, 'c').then(() => {
      redis.zscan('test', 0).then(replies => {
        expect(replies).toEqual(['0', ['a', '1', 'b', '2', 'c', '3']])
        done()
      })
    })
  })
})

import Redis from 'ioredis'

describe('keys', () => {
  it('should return an empty array if there are no keys', () => {
    const redis = new Redis()

    return redis.keys('*').then(result => {
      return expect(result).toEqual([])
    })
  })

  it('should return all data keys', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
        baz: 'quux',
      },
    })

    return redis.keys('*').then(result => {
      return expect(result).toEqual(['foo', 'baz'])
    })
  })

  it('should only return keys matching the given pattern', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
        baz: 'quux',
        flambé: 'baked alaska',
      },
    })

    return redis.keys('f*').then(result => {
      return expect(result).toEqual(['foo', 'flambé'])
    })
  })

  it('should not return empty sets', () => {
    const redis = new Redis()

    return redis
      .sadd('a', 'b')
      .then(() => {
        return redis.srem('a', 'b')
      })
      .then(() => {
        return redis.keys('*')
      })
      .then(result => {
        return expect(result).toEqual([])
      })
  })
})

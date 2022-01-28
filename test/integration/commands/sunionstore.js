import Redis from 'ioredis'

describe('sunionstore', () => {
  it('should store the union between the first set and all the successive sets at dest', () => {
    const redis = new Redis({
      data: {
        key1: new Set(['a', 'b', 'c', 'd']),
        key2: new Set(['c']),
        // key3: keys that do not exist are considered to be empty sets
        key4: new Set(['a', 'c', 'e']),
      },
    })

    return redis
      .sunionstore('dest', 'key1', 'key2', 'key3', 'key4')
      .then(count => {
        return expect(count).toEqual(5)
      })
      .then(() => {
        return redis.smembers('dest')
      })
      .then(result => {
        return expect(result).toEqual(['a', 'b', 'c', 'd', 'e'])
      })
  })

  it('should throw an exception if one of the keys is not a set', () => {
    const redis = new Redis({
      data: {
        foo: new Set(),
        bar: 'not a set',
      },
    })

    return expect(redis.sunionstore('foo', 'bar')).rejects.toEqual(
      Error('Key bar does not contain a set')
    )
  })
})

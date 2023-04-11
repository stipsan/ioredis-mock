import Redis from 'ioredis'

describe('zrange', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })
  beforeEach(async () => {
    await redis.zadd(
      'foo',
      1,
      'first',
      2,
      'second',
      3,
      'third',
      4,
      'fourth',
      5,
      'fifth'
    )
    await redis.zadd('bar', 100, 'a', 100, 'b', 100, 'c', 100, 'd', 100, 'e')
  })

  it('should return first 3 items ordered by score', () => {
    return redis
      .zrange('foo', 0, 2)
      .then(res => expect(res).toEqual(['first', 'second', 'third']))
  })

  it('should return nothing when min > max', () => {
    return redis.zrange('foo', 2, 0).then(res => expect(res).toEqual([]))
  })

  it('should return nothing if the min is greater than the max, and max is negative', () => {
    return redis.zrange('foo', 0, -8).then(res => expect(res).toEqual([]))
  })

  it('should return last 3 items', () => {
    return redis
      .zrange('foo', -3, -1)
      .then(res => expect(res).toEqual(['third', 'fourth', 'fifth']))
  })

  it('should return all items on larger ranges', () => {
    return redis
      .zrange('foo', 0, 100)
      .then(res =>
        expect(res).toEqual(['first', 'second', 'third', 'fourth', 'fifth'])
      )
  })

  it('should work even if the min is negative and larger than set size', () => {
    return redis
      .zrange('foo', -200, -3)
      .then(res => expect(res).toEqual(['first', 'second', 'third']))
  })

  it('should return empty array if out-of-range', () => {
    return redis.zrange('foo', 10, 100).then(res => expect(res).toEqual([]))
  })

  it('should throw WRONGTYPE if the key contains something other than a list', async () => {
    expect.assertions(1)

    await redis.set('baz', 'not a list')

    return redis
      .zrange('baz', 0, 2)
      .catch(err =>
        expect(err.message).toBe(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      )
  })

  it('should include scores if WITHSCORES is specified', () => {
    return redis
      .zrange('foo', 0, 2, 'WITHSCORES')
      .then(res =>
        expect(res).toEqual(['first', '1', 'second', '2', 'third', '3'])
      )
  })

  it('should sort items with the same score lexicographically', async () => {
    await redis.zadd('foobar', 5, 'aaa', 4, 'ccc', 4, 'ddd', 4, 'bbb')

    return redis
      .zrange('foobar', 0, 100)
      .then(res => expect(res).toEqual(['bbb', 'ccc', 'ddd', 'aaa']))
  })

  it('should handle REV', () => {
    return redis.zrange('foo', 0, 2, 'REV').then(res => {
      expect(res).toEqual(['fifth', 'fourth', 'third'])
    })
  })

  it('should handle REV WITHSCORES', () => {
    return redis.zrange('foo', 0, 2, 'REV', 'WITHSCORES').then(res => {
      expect(res).toEqual(['fifth', '5', 'fourth', '4', 'third', '3'])
    })
  })

  it('should handle BYSCORE', () => {
    return redis
      .zrange('foo', 2, '(4', 'BYSCORE')
      .then(res => expect(res).toEqual(['second', 'third']))
  })

  it('should handle BYSCORE with LIMIT', () => {
    return redis
      .zrange('foo', 2, '(4', 'BYSCORE', 'LIMIT', 1, 2)
      .then(res => expect(res).toEqual(['third']))
  })

  it('should handle BYSCORE with LIMIT WITHSCORES', () => {
    return redis
      .zrange('foo', 2, '(4', 'BYSCORE', 'LIMIT', 1, 2, 'WITHSCORES')
      .then(res => expect(res).toEqual(['third', '3']))
  })

  it('should handle BYSCORE REV', () => {
    return redis
      .zrange('foo', '3', '1', 'BYSCORE', 'REV')
      .then(res => expect(res).toEqual(['third', 'second', 'first']))
  })

  it('should handle BYSCORE REV WITHSCORES', () => {
    return redis
      .zrange('foo', '3', '1', 'BYSCORE', 'REV', 'WITHSCORES')
      .then(res =>
        expect(res).toEqual(['third', '3', 'second', '2', 'first', '1'])
      )
  })

  it('should handle BYSCORE REV with LIMIT', () => {
    return redis
      .zrange('foo', '3', '1', 'BYSCORE', 'REV', 'LIMIT', 0, 1)
      .then(res => expect(res).toEqual(['third']))
  })

  it('should handle BYSCORE REV with LIMIT WITHSCORES', () => {
    return redis
      .zrange('foo', '3', '1', 'BYSCORE', 'REV', 'LIMIT', 0, 1, 'WITHSCORES')
      .then(res => expect(res).toEqual(['third', '3']))
  })

  it('should handle BYLEX', () => {
    return redis
      .zrange('bar', '[b', '(d', 'BYLEX')
      .then(res => expect(res).toEqual(['b', 'c']))
  })

  it('should handle BYLEX with LIMIT', () => {
    return redis
      .zrange('bar', '[b', '(d', 'BYLEX', 'LIMIT', 1, 2)
      .then(res => expect(res).toEqual(['c']))
  })

  it('should handle BYLEX REV', () => {
    return redis
      .zrange('bar', '[c', '[a', 'BYLEX', 'REV')
      .then(res => expect(res).toEqual(['c', 'b', 'a']))
  })

  it('should handle BYLEX REV with LIMIT', () => {
    return redis
      .zrange('bar', '[c', '[a', 'BYLEX', 'REV', 'LIMIT', 0, 1)
      .then(res => expect(res).toEqual(['c']))
  })
})

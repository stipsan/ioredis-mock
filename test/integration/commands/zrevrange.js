import Redis from 'ioredis'

describe('zrevrange', () => {
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
  })

  it('should return first 3 items ordered by score in reverse', () => {
    return redis
      .zrevrange('foo', 0, 2)
      .then(res => expect(res).toEqual(['fifth', 'fourth', 'third']))
  })

  it('should return last 3 items in reverse', () => {
    return redis
      .zrevrange('foo', -3, -1)
      .then(res => expect(res).toEqual(['third', 'second', 'first']))
  })

  it('should return last all items on larger numbers in reverse', () => {
    return redis
      .zrevrange('foo', 0, 100)
      .then(res =>
        expect(res).toEqual(['fifth', 'fourth', 'third', 'second', 'first'])
      )
  })

  it('should return empty array if out-of-range', () => {
    return redis.zrevrange('foo', 10, 100).then(res => expect(res).toEqual([]))
  })

  it('should throw WRONGTYPE if the key contains something other than a list', async () => {
    expect.assertions(1)

    await redis.set('foo', 'not a list')

    return redis
      .zrevrange('foo', 0, 2)
      .catch(err =>
        expect(err.message).toBe(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      )
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should sort items with the same score in reverse lexicographical order',
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
        .zrevrange('foo', 0, 100)
        .then(res => expect(res).toEqual(['aaa', 'ddd', 'ccc', 'bbb']))
    }
  )
})

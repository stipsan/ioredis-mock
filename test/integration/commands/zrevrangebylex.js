import Redis from 'ioredis'

describe('zrevrangebylex', () => {
  beforeEach(async () => {
    const redis = new Redis()
    await redis.zadd('foo', 2, 'a', 2, 'b', 2, 'c', 2, 'd', 2, 'e')
  })
  it('should return using inclusive compare', () => {
    const redis = new Redis()

    return redis
      .zrevrangebylex('foo', '[d', '[b')
      .then(res => expect(res).toEqual(['d', 'c', 'b']))
  })

  it('should return using exclusive compare', () => {
    const redis = new Redis()

    return redis
      .zrevrangebylex('foo', '(d', '(b')
      .then(res => expect(res).toEqual(['c']))
  })

  it('should accept - string', () => {
    const redis = new Redis()

    return redis
      .zrevrangebylex('foo', '(c', '-')
      .then(res => expect(res).toEqual(['b', 'a']))
  })

  it('should accept + string', () => {
    const redis = new Redis()

    return redis
      .zrevrangebylex('foo', '+', '(c')
      .then(res => expect(res).toEqual(['e', 'd']))
  })

  it('should accept -+ strings', () => {
    const redis = new Redis()

    return redis
      .zrevrangebylex('foo', '+', '-')
      .then(res => expect(res).toEqual(['e', 'd', 'c', 'b', 'a']))
  })
  it('should return empty array if out-of-range', () => {
    const redis = new Redis()

    return redis
      .zrevrangebylex('foo', '[z', '(f')
      .then(res => expect(res).toEqual([]))
  })

  it('should return empty array if key not found', () => {
    const redis = new Redis()

    return redis
      .zrevrangebylex('boo', '+', '-')
      .then(res => expect(res).toEqual([]))
  })

  it('should return empty array if the key contains something other than a list', async () => {
    expect.assertions(1)
    const redis = new Redis()
    await redis.set('foo', 'not a list')

    return redis
      .zrevrangebylex('foo', '+', '-')
      .catch(err =>
        expect(err.message).toBe(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      )
  })

  it('should handle offset and limit (0,1)', () => {
    const redis = new Redis()
    return redis
      .zrevrangebylex('foo', '[c', '[a', 'LIMIT', 0, 1)
      .then(res => expect(res).toEqual(['c']))
  })

  it('should handle offset and limit (1,2)', () => {
    const redis = new Redis()
    return redis
      .zrevrangebylex('foo', '[c', '[a', 'LIMIT', 1, 2)
      .then(res => expect(res).toEqual(['b', 'a']))
  })

  // TODO Skipped because there's a bug in our implementation
  ;(process.env.IS_E2E ? it : it.skip)('should handle LIMIT of -1', () => {
    const redis = new Redis()
    return redis
      .zrevrangebylex('foo', '+', '-', 'LIMIT', 1, -1)
      .then(res => expect(res).toEqual(['d', 'c', 'b', 'a']))
  })

  // TODO Skipped because there's a bug in our implementation
  ;(process.env.IS_E2E ? it : it.skip)('should handle LIMIT of -2', () => {
    const redis = new Redis()
    return redis
      .zrevrangebylex('foo', '+', '-', 'LIMIT', 1, -2)
      .then(res => expect(res).toEqual(['d', 'c', 'b', 'a']))
  })

  it('should handle LIMIT of 0', () => {
    const redis = new Redis()
    return redis
      .zrevrangebylex('foo', '+', '-', 'LIMIT', 1, 0)
      .then(res => expect(res).toEqual([]))
  })
})

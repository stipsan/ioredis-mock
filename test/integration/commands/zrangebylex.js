import Redis from 'ioredis'

describe('zrangebylex', () => {
  const data = {
    foo: new Map([
      ['a', { score: 2, value: 'a' }],
      ['b', { score: 2, value: 'b' }],
      ['c', { score: 2, value: 'c' }],
      ['d', { score: 2, value: 'd' }],
      ['e', { score: 2, value: 'e' }],
    ]),
  }
  it('should return using inclusive compare', () => {
    const redis = new Redis({ data })

    return redis
      .zrangebylex('foo', '[b', '[d')
      .then(res => expect(res).toEqual(['b', 'c', 'd']))
  })

  it('should return using exclusive compare', () => {
    const redis = new Redis({ data })

    return redis
      .zrangebylex('foo', '(b', '(d')
      .then(res => expect(res).toEqual(['c']))
  })

  it('should accept - string', () => {
    const redis = new Redis({ data })

    return redis
      .zrangebylex('foo', '-', '(c')
      .then(res => expect(res).toEqual(['a', 'b']))
  })
  it('should accept + string', () => {
    const redis = new Redis({ data })

    return redis
      .zrangebylex('foo', '(c', '+')
      .then(res => expect(res).toEqual(['d', 'e']))
  })

  it('should accept -+ strings', () => {
    const redis = new Redis({ data })

    return redis
      .zrangebylex('foo', '-', '+')
      .then(res =>
        expect(res).toEqual(['a', 'b', 'c', 'd', 'e'])
      )
  })
  it('should return empty array if out-of-range', () => {
    const redis = new Redis({ data })

    return redis
      .zrangebylex('foo', '(f', '[z')
      .then(res => expect(res).toEqual([]))
  })

  it('should return empty array if key not found', () => {
    const redis = new Redis({ data })

    return redis
      .zrangebylex('boo', '-', '+')
      .then(res => expect(res).toEqual([]))
  })

  it('should return empty array if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    })

    return redis
      .zrangebylex('foo', '-', '+')
      .then(res => expect(res).toEqual([]))
  })

  it('should handle offset and limit (0,1)', () => {
    const redis = new Redis({ data })
    return redis
      .zrangebylex('foo', '[a', '[c', 'LIMIT', 0, 1)
      .then(res => expect(res).toEqual(['a']))
  })
  it('should handle offset and limit (1,2)', () => {
    const redis = new Redis({ data })
    return redis
      .zrangebylex('foo', '[a', '[c', 'LIMIT', 1, 2)
      .then(res => expect(res).toEqual(['b', 'c']))
  })
  it('should handle LIMIT of -1', () => {
    const redis = new Redis({ data })
    return redis
      .zrangebylex('foo', '-', '+', 'LIMIT', 1, -1)
      .then(res => expect(res).toEqual(['b', 'c', 'd']))
  })
  it('should handle LIMIT of -2', () => {
    const redis = new Redis({ data })
    return redis
      .zrangebylex('foo', '-', '+', 'LIMIT', 1, -2)
      .then(res => expect(res).toEqual(['b', 'c']))
  })
  it('should handle LIMIT of 0', () => {
    const redis = new Redis({ data })
    return redis
      .zrangebylex('foo', '-', '+', 'LIMIT', 1, 0)
      .then(res => expect(res).toEqual([]))
  })
})

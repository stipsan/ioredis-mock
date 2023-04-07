import Redis from 'ioredis'

describe('zrevrangebyscore', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
  }
  it('should return using not strict compare', () => {
    const redis = new Redis({ data })

    return redis
      .zrevrangebyscore('foo', 3, 1)
      .then(res => expect(res).toEqual(['third', 'second', 'first']))
  })

  it('should return using strict compare', () => {
    const redis = new Redis({ data })

    return redis
      .zrevrangebyscore('foo', 5, '(3')
      .then(res => expect(res).toEqual(['fifth', 'fourth']))
  })

  it('should accept infinity string', () => {
    const redis = new Redis({ data })

    return redis
      .zrevrangebyscore('foo', '+inf', '-inf')
      .then(res =>
        expect(res).toEqual(['fifth', 'fourth', 'third', 'second', 'first'])
      )
  })

  it('should return empty array if out-of-range', () => {
    const redis = new Redis({ data })

    return redis
      .zrevrangebyscore('foo', 100, 10)
      .then(res => expect(res).toEqual([]))
  })

  it('should return empty array if key not found', () => {
    const redis = new Redis({ data })

    return redis
      .zrevrangebyscore('boo', 100, 10)
      .then(res => expect(res).toEqual([]))
  })

  it('should return empty array if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    })

    return redis
      .zrevrangebyscore('foo', 2, 1)
      .then(res => expect(res).toEqual([]))
  })

  it('should include scores if WITHSCORES is specified', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', 3, 1, 'WITHSCORES')
      .then(res => expect(res).toEqual(['third', '3', 'second', '2', 'first', '1']))
  })

  it('should sort items with the same score in reverse lexicographical order', () => {
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
      .zrevrangebyscore('foo', '+inf', '-inf', 'WITHSCORES')
      .then(res =>
        expect(res).toEqual(['aaa', '5', 'ddd', '4', 'ccc', '4', 'bbb', '4'])
      )
  })

  it('should handle offset and limit (0,1)', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', 3, 1, 'LIMIT', 0, 1)
      .then(res => expect(res).toEqual(['third']))
  })
  it('should handle offset and limit (1,2)', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', 3, 1, 'LIMIT', 1, 2)
      .then(res => expect(res).toEqual(['second', 'first']))
  })
  it('should handle offset, limit, and WITHSCORES', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', 3, 1, 'WITHSCORES', 'LIMIT', 1, 1)
      .then(res => expect(res).toEqual(['second', '2']))
  })
  it('should handle LIMIT specified before WITHSCORES', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', 3, 1, 'LIMIT', 1, 1, 'WITHSCORES')
      .then(res => expect(res).toEqual(['second', '2']))
  })
  it('should handle LIMIT of -1', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', '+inf', '-inf', 'LIMIT', 1, -1)
      .then(res => expect(res).toEqual(['fourth', 'third', 'second']))
  })
  it('should handle LIMIT of -1 and WITHSCORES', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', '+inf', '-inf', 'LIMIT', 1, -1, 'WITHSCORES')
      .then(res => expect(res).toEqual(['fourth', '4', 'third', '3', 'second', '2']))
  })
  it('should handle LIMIT of -2', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', '+inf', '-inf', 'LIMIT', 1, -2)
      .then(res => expect(res).toEqual(['fourth', 'third']))
  })
  it('should handle LIMIT of 0', () => {
    const redis = new Redis({ data })
    return redis
      .zrevrangebyscore('foo', '+inf', '-inf', 'LIMIT', 1, 0)
      .then(res => expect(res).toEqual([]))
  })
})

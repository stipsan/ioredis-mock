import Redis from 'ioredis'

describe('zrevrange', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
  }
  it('should return first 3 items ordered by score in reverse', () => {
    const redis = new Redis({ data })

    return redis.zrevrange('foo', 0, 2).then(res => {
      return expect(res).toEqual(['fifth', 'fourth', 'third'])
    })
  })

  it('should return last 3 items in reverse', () => {
    const redis = new Redis({ data })

    return redis.zrevrange('foo', -3, -1).then(res => {
      return expect(res).toEqual(['third', 'second', 'first'])
    })
  })

  it('should return last all items on larger numbers in reverse', () => {
    const redis = new Redis({ data })

    return redis.zrevrange('foo', 0, 100).then(res => {
      return expect(res).toEqual([
        'fifth',
        'fourth',
        'third',
        'second',
        'first',
      ])
    })
  })

  it('should return empty array if out-of-range', () => {
    const redis = new Redis({ data })

    return redis.zrevrange('foo', 10, 100).then(res => {
      return expect(res).toEqual([])
    })
  })

  it('should return empty array if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    })

    return redis.zrevrange('foo', 0, 2).then(res => {
      return expect(res).toEqual([])
    })
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

    return redis.zrevrange('foo', 0, 100).then(res => {
      return expect(res).toEqual(['aaa', 'ddd', 'ccc', 'bbb'])
    })
  })
})

import Redis from 'ioredis'

describe('lrem', () => {
  it('should remove the items from the end of the list when count is negative', () => {
    const redis = new Redis({
      data: {
        foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
      },
    })

    return redis.lrem('foo', -2, 'foo').then(() => {
      return expect(redis.data.get('foo')).toEqual(['foo', 'bar', 'baz'])
    })
  })

  it('should remove the items from the beginning of the list when count is positive', () => {
    const redis = new Redis({
      data: {
        foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
      },
    })

    return redis.lrem('foo', 2, 'foo').then(() => {
      return expect(redis.data.get('foo')).toEqual(['bar', 'baz', 'foo'])
    })
  })

  it('should remove all the items when count is 0', () => {
    const redis = new Redis({
      data: {
        foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
      },
    })

    return redis.lrem('foo', 0, 'foo').then(() => {
      return expect(redis.data.get('foo')).toEqual(['bar', 'baz'])
    })
  })

  it('should return the number of items removed ', () => {
    const redis = new Redis({
      data: {
        foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
      },
    })

    return redis.lrem('foo', -2, 'baz').then(removed => {
      return expect(removed).toBe(1)
    })
  })

  it('should return 0 if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    })

    return redis.lrem('foo', 1).then(removed => {
      return expect(removed).toBe(0)
    })
  })
})

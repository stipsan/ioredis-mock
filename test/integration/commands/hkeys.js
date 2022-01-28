import Redis from 'ioredis'

describe('hkeys', () => {
  it('should return an empty array if there are no keys', () => {
    const redis = new Redis()

    return redis.hkeys('foo').then(result => {
      return expect(result).toEqual([])
    })
  })

  it('should return all data keys', () => {
    const redis = new Redis({
      data: {
        foo: { bar: '1', baz: '2' },
      },
    })

    return redis.hkeys('foo').then(result => {
      return expect(result).toEqual(['bar', 'baz'])
    })
  })
})

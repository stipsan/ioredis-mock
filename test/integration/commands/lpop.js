import Redis from 'ioredis'

describe('lpop', () => {
  it('should remove and return first element of list', () => {
    const redis = new Redis({
      data: {
        foo: ['3', '2', '1'],
      },
    })

    return redis
      .lpop('foo')
      .then(result => {
        return expect(result).toBe('3')
      })
      .then(() => {
        return expect(redis.data.get('foo')).toEqual(['2', '1'])
      })
  })

  it('should return null on empty list', () => {
    const redis = new Redis({
      data: {
        foo: [],
      },
    })

    return redis.lpop('foo').then(result => {
      return expect(result).toBe(null)
    })
  })

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    })

    return redis.lpop('foo').catch(err => {
      return expect(err.message).toBe('Key foo does not contain a list')
    })
  })
})

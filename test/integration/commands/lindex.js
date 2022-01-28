import Redis from 'ioredis'

describe('lindex', () => {
  it('should return item list', () => {
    const redis = new Redis({
      data: {
        mylist: ['Hello', 'World'],
      },
    })

    return redis
      .lindex('mylist', 0)
      .then(result => {
        return expect(result).toBe('Hello')
      })
      .then(() => {
        return redis.lindex('mylist', -1)
      })
      .then(result => {
        return expect(result).toBe('World')
      })
      .then(() => {
        return redis.lindex('mylist', 3)
      })
      .then(result => {
        return expect(result).toBe(null)
      })
  })

  it('should return null if the list does not exist', () => {
    const redis = new Redis({
      data: {},
    })

    return redis.lindex('foo', 0).then(result => {
      return expect(result).toBe(null)
    })
  })

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    })

    return redis.lindex('foo', 0).catch(err => {
      return expect(err.message).toBe('Key foo does not contain a list')
    })
  })
})

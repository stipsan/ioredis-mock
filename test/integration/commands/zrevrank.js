import Redis from 'ioredis'

describe('zrevrank', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
    ]),
  }

  it('should do nothing if key does not exist', () => {
    const redis = new Redis({ data: {} })

    return redis
      .zrevrank('foo', 'not-exist')
      .then(status => {
        return expect(status).toBe(null)
      })
      .then(() => {
        return expect(redis.data.has('foo')).toBe(false)
      })
  })

  it('should return null if not found', () => {
    const redis = new Redis({ data })

    return redis.zrevrank('foo', 'not-found').then(status => {
      return expect(status).toBe(null)
    })
  })

  it('should return found index', () => {
    const redis = new Redis({ data })

    return redis.zrevrank('foo', 'first').then(status => {
      return expect(status).toBe(2)
    })
  })
})

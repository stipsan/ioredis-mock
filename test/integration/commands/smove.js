import Redis from 'ioredis'

describe('smove', () => {
  it('should move value from source to destination', () => {
    const redis = new Redis({
      data: {
        foo: new Set(['one', 'two', 'three']),
      },
    })

    return redis
      .smove('foo', 'bar', 'two')
      .then(status => {
        return expect(status).toBe(1)
      })
      .then(() => {
        expect(redis.data.get('foo').has('two')).toBe(false)
        expect(redis.data.get('bar').has('two')).toBe(true)
      })
  })

  it('should return 0 if member does not exist in source', () => {
    const redis = new Redis({
      data: {
        foo: new Set(['one', 'three']),
      },
    })

    return redis
      .smove('foo', 'bar', 'two')
      .then(status => {
        return expect(status).toBe(0)
      })
      .then(() => {
        return expect(redis.data.has('bar')).toBe(false)
      })
  })

  it('should return 0 if source does not exist', () => {
    const redis = new Redis()

    return redis.smove('foo', 'bar', 'two').then(status => {
      return expect(status).toBe(0)
    })
  })

  it('should throw an exception if the source contains something other than a set', () => {
    const redis = new Redis({
      data: {
        foo: 'not a set',
      },
    })

    return redis.smove('foo', 'bar', 'two').catch(err => {
      return expect(err.message).toBe('Key foo does not contain a set')
    })
  })

  it('should throw an exception if the destination contains something other than a set', () => {
    const redis = new Redis({
      data: {
        foo: new Set(),
        bar: 'not a set',
      },
    })

    return redis.smove('foo', 'bar', 'two').catch(err => {
      return expect(err.message).toBe('Key bar does not contain a set')
    })
  })
})

import Redis from 'ioredis'

describe('lset', () => {
  it('should set the list element at index to value', () => {
    const redis = new Redis({
      data: {
        mylist: ['one', 'two', 'three'],
      },
    })

    return redis
      .lset('mylist', 0, 'four')
      .then(result => {
        return expect(result).toBe('OK')
      })
      .then(() => {
        return redis.lset('mylist', -2, 'five')
      })
      .then(result => {
        return expect(result).toBe('OK')
      })
      .then(() => {
        return expect(redis.data.get('mylist')).toEqual([
          'four',
          'five',
          'three',
        ])
      })
  })

  it('should throw an exception if the key does not exist', () => {
    const redis = new Redis()

    return redis.lset('mylist', 0, 'foo').catch(err => {
      return expect(err.message).toBe('no such key')
    })
  })

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    })

    return redis.lset('foo', 0, 'bar').catch(err => {
      return expect(err.message).toBe('Key foo does not contain a list')
    })
  })

  it('should throw errors when index is out of range', () => {
    const redis = new Redis({
      data: {
        mylist: ['one', 'two', 'three'],
      },
    })

    return redis
      .lset('mylist', 5, 'four')
      .catch(err => {
        expect(err.message).toBe('index out of range')

        return redis.lset('mylist', -5, 'five')
      })
      .catch(err => {
        return expect(err.message).toBe('index out of range')
      })
  })
})

import Redis from 'ioredis'

describe('lpushx', () => {
  it('should add the values to the list in the correct order', () => {
    const redis = new Redis({
      data: {
        foo: ['2'],
      },
    })

    return redis.lpushx('foo', 1).then(() => {
      return expect(redis.data.get('foo')).toEqual(['1', '2'])
    })
  })

  it('should return the new length of the list', () => {
    const redis = new Redis({
      data: {
        foo: ['2'],
      },
    })

    return redis.lpushx('foo', 1).then(result => {
      return expect(result).toBe(2)
    })
  })

  it('should return 0 if list does not exist', () => {
    const redis = new Redis()

    return redis.lpushx('foo', 1).then(result => {
      return expect(result).toBe(0)
    })
  })
})

import Redis from 'ioredis'

describe('getBuffer', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new Redis()

    return redis.getBuffer('foo').then(result => {
      return expect(result).toBe(null)
    })
  })

  it('should return value of key as buffer', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
      },
    })

    return redis.getBuffer('foo').then(result => {
      expect(Buffer.isBuffer(result)).toBeTruthy()
      expect(result).toEqual(Buffer.from('bar'))
    })
  })

  it('should return buffer values correctly', () => {
    const bufferVal = Buffer.from('bar')
    const redis = new Redis({
      data: {
        foo: bufferVal,
      },
    })

    return redis.getBuffer('foo').then(result => {
      return expect(result.equals(bufferVal)).toBe(true)
    })
  })
})

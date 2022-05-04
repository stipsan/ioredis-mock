import Redis from 'ioredis'

describe('srandmember', () => {
  it('should return a random item', () => {
    const redis = new Redis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    })

    return redis
      .srandmember('myset')
      .then(result => expect(['one', 'two', 'three']).toContain(result))
  })

  it('should return random unique items', () => {
    const redis = new Redis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    })

    return redis.srandmember('myset', 2).then(results => {
      expect(['one', 'two', 'three']).toContain(results[0])
      expect(['one', 'two', 'three']).toContain(results[1])
      expect(results[0]).not.toBe(results[1])
    })
  })

  it('should return set if positive count is bigger than set', () => {
    const redis = new Redis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    })

    return redis.srandmember('myset', 5).then(results => {
      expect(['one', 'two', 'three']).toContain(results[0])
      expect(['one', 'two', 'three']).toContain(results[1])
      expect(['one', 'two', 'three']).toContain(results[2])
    })
  })

  it('should return random items with specified length', () => {
    const redis = new Redis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    })

    return redis
      .srandmember('myset', -5)
      .then(results => expect(results.length).toBe(5))
  })

  it('should return null if set is empty', () => {
    const redis = new Redis()

    return redis.srandmember('myset').then(result => expect(result).toBe(null))
  })

  it('should throw an exception if the key contains something other than a set', () => {
    const redis = new Redis({
      data: {
        foo: 'not a set',
      },
    })

    return redis
      .srandmember('foo')
      .catch(err => expect(err.message).toBe('Key foo does not contain a set'))
  })
})

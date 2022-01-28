import Redis from 'ioredis'

describe('type', () => {
  const redis = new Redis()

  test('should return none when key does not exist', () => {
    return redis.type('nope').then(type => {
      return expect(type).toBe('none')
    })
  })

  test('should return string', () => {
    return redis
      .set('mystring', 'foo')
      .then(() => {
        return redis.type('mystring')
      })
      .then(type => {
        return expect(type).toBe('string')
      })
  })

  test('should return list', () => {
    return redis
      .lpush('mylist', 'foo')
      .then(() => {
        return redis.type('mylist')
      })
      .then(type => {
        return expect(type).toBe('list')
      })
  })

  test('should return set', () => {
    return redis
      .sadd('myset', 'foo')
      .then(() => {
        return redis.type('myset')
      })
      .then(type => {
        return expect(type).toBe('set')
      })
  })

  test('should return hash', () => {
    return redis
      .hset('myhash', 'foo', 'bar')
      .then(() => {
        return redis.type('myhash')
      })
      .then(type => {
        return expect(type).toBe('hash')
      })
  })

  test.todo('should return zset')
})

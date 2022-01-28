import Chance from 'chance'
import Redis from 'ioredis'
import { ObjectWritableMock } from 'stream-mock'

describe('keyprefix', () => {
  let writable

  beforeEach(() => {
    writable = new ObjectWritableMock({ objectMode: true })
  })

  describe('get', () => {
    it('should return null on keys that do not exist', () => {
      const redis = new Redis({ keyPrefix: 'test:' })
      return redis.get('bar').then(result => {
        return expect(result).toBe(null)
      })
    })

    it('should return value of key', () => {
      const redis = new Redis({
        data: {
          foo: 'bar',
        },
        keyPrefix: 'test:',
      })

      return redis.get('foo').then(result => {
        return expect(result).toBe('bar')
      })
    })
  })

  describe('set', () => {
    it('should return OK when setting a hash key', () => {
      const redis = new Redis({ keyPrefix: 'test:' })
      return redis
        .set('foo', 'bar')
        .then(status => {
          return expect(status).toBe('OK')
        })
        .then(() => {
          return expect(redis.data.get('foo')).toBe('bar')
        })
    })

    it('should turn number to string', () => {
      const redis = new Redis({ keyPrefix: 'test:' })
      return redis
        .set('foo', 1.5)
        .then(status => {
          return expect(status).toBe('OK')
        })
        .then(() => {
          return expect(redis.data.get('foo')).toBe('1.5')
        })
    })
  })

  describe('del', () => {
    const redis = new Redis({
      data: {
        deleteme: 'please',
        metoo: 'pretty please',
      },
      keyPrefix: 'test:',
    })

    it('should delete passed in keys', () => {
      return redis
        .del('deleteme', 'metoo')
        .then(status => {
          return expect(status).toBe(2)
        })
        .then(() => {
          return expect(redis.data.has('deleteme')).toBe(false)
        })
        .then(() => {
          return expect(redis.data.has('metoo')).toBe(false)
        })
    })

    it('return the number of keys removed', () => {
      return redis.del('deleteme', 'metoo').then(status => {
        return expect(status).toBe(0)
      })
    })
  })

  describe('scanSream', () => {
    it('should batch by count', done => {
      // Given
      const chance = new Chance()
      const keys = chance.unique(chance.word, 100)
      const count = 11
      const redis = new Redis({
        data: { set: new Set(keys) },
        keyPrefix: 'test:',
      })
      const stream = redis.sscanStream('set', { count })
      // When
      stream.pipe(writable)
      writable.on('finish', () => {
        // Then
        expect(writable.data.length).toEqual(Math.ceil(keys.length / count))
        expect([].concat(...writable.data)).toEqual(keys)
        done()
      })
    })

    it('should return  keys', done => {
      // Given
      const redis = new Redis({
        data: {
          foo: new Set(['foo0', 'foo1', 'foo2']),
          zu: new Set(['ZU0', 'ZU1']),
        },
        keyPrefix: 'test:',
      })

      const stream = redis.scanStream()
      // When
      stream.pipe(writable)
      writable.on('finish', () => {
        // Then
        expect([].concat(...writable.data)).toEqual(['test:foo', 'test:zu'])
        done()
      })
    })

    it('should return only mathced keys', done => {
      // Given
      const redis = new Redis({
        data: {
          set: new Set(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
        },
        keyPrefix: 'test:',
      })

      const stream = redis.sscanStream('set', { match: 'foo*' })
      // When
      stream.pipe(writable)
      writable.on('finish', () => {
        // Then
        expect([].concat(...writable.data)).toEqual(['foo0', 'foo1', 'foo2'])
        done()
      })
    })
  })

  describe('multiple instance use same key with different keyPrefix', () => {
    const redisBase = new Redis({
      data: {
        'test:foo': 'bar',
        'test:hello': 'world',
      },
    })
    const redis1 = redisBase.createConnectedClient({
      keyPrefix: 'test:',
    })

    const redis2 = redis1.createConnectedClient({
      keyPrefix: 'test2:',
    })

    it('should return value of key using prefix', () => {
      return redis1.get('foo').then(result => {
        return expect(result).toEqual('bar')
      })
    })

    it('should return null on keys that do not exist for that prefix', () => {
      return redis2.get('foo').then(result => {
        return expect(result).toBe(null)
      })
    })

    it('setting with one prefix should not affect same key with another prefix', () => {
      return redis2
        .set('hello', 'ioredis')
        .then(status => {
          return expect(status).toBe('OK')
        })
        .then(() => {
          return redis1.get('hello')
        })
        .then(result => {
          return expect(result).toBe('world')
        })
    })

    it('should return value of key if the prefix is the same', () => {
      return redis2
        .set('hello', 'ioredis')
        .then(status => {
          return expect(status).toBe('OK')
        })
        .then(() => {
          return expect(redis2.data.get('hello')).toBe('ioredis')
        })
    })
  })
})

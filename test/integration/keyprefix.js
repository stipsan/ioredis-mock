import Chance from 'chance'
import Redis from 'ioredis'

describe('keyprefix', () => {
  let redis

  afterEach(() => {
    if (redis) {
      redis.disconnect()
      redis = null
    }
  })

  describe('get', () => {
    it('should return null on keys that do not exist', async () => {
      redis = new Redis({ keyPrefix: 'test:' })

      expect(await redis.get('bar')).toBe(null)
    })

    it('should return value of key', async () => {
      redis = new Redis({ keyPrefix: 'test:' })
      await redis.set('foo', 'bar')

      expect(await redis.get('foo')).toBe('bar')
    })
  })

  describe('set', () => {
    it('should return OK when setting a hash key', async () => {
      redis = new Redis({ keyPrefix: 'test:' })

      expect(await redis.set('foo', 'bar')).toBe('OK')
      expect(await redis.get('foo')).toBe('bar')
    })

    it('should turn number to string', async () => {
      redis = new Redis({ keyPrefix: 'test:' })

      expect(await redis.set('foo', 1.5)).toBe('OK')
      expect(await redis.get('foo')).toBe('1.5')
    })
  })

  describe('del', () => {
    it('should delete passed in keys', async () => {
      redis = new Redis({ keyPrefix: 'test:' })
      await redis.set('deleteme', 'please')
      await redis.set('metoo', 'pretty please')

      expect(await redis.del('deleteme', 'metoo')).toBe(2)
      expect(await redis.get('deleteme')).toBe(null)
      expect(await redis.get('metoo')).toBe(null)
    })

    it('return the number of keys removed', async () => {
      redis = new Redis({ keyPrefix: 'test:' })
      await redis.set('deleteme', 'please')
      await redis.set('metoo', 'pretty please')

      expect(await redis.del('deleteme', 'metoo')).toBe(2)
    })
  })

  describe('scanSream', () => {
    it('should batch by count', done => {
      const chance = new Chance()
      const keys = chance.unique(chance.word, 100).sort()
      const count = 11
      redis = new Redis({ keyPrefix: 'test:' })
      redis.sadd('set', ...keys)

      let chunks = []
      const stream = redis.sscanStream('set', { count })
      stream.on('data', data => {
        chunks = chunks.concat(data)
      })
      stream.on('end', () => {
        expect([].concat(...chunks).sort()).toEqual(keys)
        done()
      })
    })

    it('should return  keys', done => {
      redis = new Redis({ keyPrefix: 'test:' })
      redis.sadd('foo', 'foo0', 'foo1', 'foo2')
      redis.sadd('zu', 'ZU0', 'ZU1')

      let chunks = []
      const stream = redis.scanStream()
      stream.on('data', data => {
        chunks = chunks.concat(data)
      })
      stream.on('end', () => {
        expect([].concat(...chunks).sort()).toEqual(['test:foo', 'test:zu'])
        done()
      })
    })

    it('should return only mathced keys', done => {
      redis = new Redis({ keyPrefix: 'test:' })
      redis.sadd('set', 'foo0', 'ZU0', 'foo1', 'foo2', 'ZU1')

      let chunks = []
      const stream = redis.sscanStream('set', { match: 'foo*' })
      stream.on('data', data => {
        chunks = chunks.concat(data)
      })
      stream.on('end', () => {
        expect([].concat(...chunks).sort()).toEqual(['foo0', 'foo1', 'foo2'])
        done()
      })
    })
  })

  describe('multiple instance use same key with different keyPrefix', () => {
    const redisBase = new Redis()
    const redis1 = new Redis({
      keyPrefix: 'test:',
    })

    const redis2 = new Redis({
      keyPrefix: 'test2:',
    })

    beforeEach(async () => {
      await redisBase.set('test:foo', 'bar')
      await redisBase.set('test:hello', 'world')
    })

    afterAll(() => {
      redisBase.disconnect()
      redis1.disconnect()
      redis2.disconnect()
    })

    it('should return value of key using prefix', async () => {
      expect(await redis1.get('foo')).toEqual('bar')
    })

    it('should return null on keys that do not exist for that prefix', async () => {
      expect(await redis2.get('foo')).toBe(null)
    })

    it('setting with one prefix should not affect same key with another prefix', async () => {
      expect(await redis2.set('hello', 'ioredis')).toBe('OK')
      expect(await redis1.get('hello')).toBe('world')
    })

    it('should return value of key if the prefix is the same', async () => {
      expect(await redis2.set('hello', 'ioredis')).toBe('OK')
      expect(await redis2.get('hello')).toBe('ioredis')
    })
  })
})

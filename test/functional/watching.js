import Redis from 'ioredis'

describe('watching', () => {
  let redis

  beforeEach(() => {
    redis = new Redis()
  })

  afterEach(() => {
    redis.disconnect()
  })

  describe('watch', () => {
    it('should set the watched keys', async () => {
      expect(await redis.watch('foo', 'bar')).toBe('OK')
      expect(redis.watching).toContain('foo', 'bar')
      expect(redis.dirty).toBe(false)
    })

    it('should mark the client as dirty if a key is modified', async () => {
      expect(await redis.watch('foo', 'bar')).toBe('OK')
      await redis.set('foo', '')
      expect(redis.dirty).toBe(true)
    })

    it('should not add watched key if dirty', async () => {
      expect(await redis.watch('foo')).toBe('OK')
      await redis.set('foo', '')
      expect(redis.dirty).toBe(true)
      expect(await redis.watch('bar')).toBe('OK')
      expect(redis.watching).toEqual(new Set(['foo']))
    })
  })

  describe('unwatch', () => {
    it('should unwatch all watched keys', async () => {
      expect(await redis.watch('foo', 'bar')).toBe('OK')
      expect(redis.watching).toContain('foo', 'bar')
      expect(await redis.unwatch()).toBe('OK')
      expect(redis.watching.size).toBe(0)
    })

    it('should mark the client as not dirty', async () => {
      expect(await redis.watch('foo', 'bar')).toBe('OK')
      await redis.set('foo', '')
      expect(redis.dirty).toBe(true)
      expect(await redis.unwatch()).toBe('OK')
      expect(redis.dirty).toBe(false)
    })
  })
})

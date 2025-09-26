import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('set', (command, equals) => {
  describe(command, () => {
    it('should return OK when setting a hash key', async () => {
      const redis = new Redis()

      expect(equals(await redis[command]('foo', 'bar'), 'OK')).toBe(true)
      expect(await redis.get('foo')).toBe('bar')
      redis.disconnect()
    })

    it('should turn number to string', async () => {
      const redis = new Redis()

      expect(equals(await redis[command]('foo', 1.5), 'OK')).toBe(true)
      expect(await redis.get('foo')).toBe('1.5')
      redis.disconnect()
    })

    it('should set empty value if null', async () => {
      const redis = new Redis()

      expect(equals(await redis[command]('foo', null), 'OK')).toBe(true)
      expect(await redis.get('foo')).toBe('')
      redis.disconnect()
    })

    it('should set value and expire', async () => {
      const redis = new Redis()

      expect(equals(await redis[command]('foo', 'bar', 'EX', 10), 'OK')).toBe(
        true
      )
      expect(await redis.get('foo')).toBe('bar')
      expect(await redis.ttl('foo')).toBeGreaterThanOrEqual(1)
      redis.disconnect()
    })

    it('should set value and expire with PX', async () => {
      const redis = new Redis()

      expect(
        equals(await redis[command]('foo', 'bar', 'PX', 10000), 'OK')
      ).toBe(true)
      expect(await redis.get('foo')).toBe('bar')
      expect(await redis.pttl('foo')).toBeGreaterThanOrEqual(1)
      redis.disconnect()
    })

    it('should set value and expire with EXAT', async () => {
      const redis = new Redis()
      const futureTime = Math.floor(Date.now() / 1000) + 10

      expect(
        equals(await redis[command]('foo', 'bar', 'EXAT', futureTime), 'OK')
      ).toBe(true)
      expect(await redis.get('foo')).toBe('bar')
      expect(await redis.ttl('foo')).toBeGreaterThanOrEqual(1)
      redis.disconnect()
    })

    it('should set value and expire with PXAT', async () => {
      const redis = new Redis()
      const futureTime = Date.now() + 10000

      expect(
        equals(await redis[command]('foo', 'bar', 'PXAT', futureTime), 'OK')
      ).toBe(true)
      expect(await redis.get('foo')).toBe('bar')
      expect(await redis.pttl('foo')).toBeGreaterThanOrEqual(1)

      // Test that the key expires
      await new Promise(resolve => setTimeout(resolve, 200))
      // For a more immediate test, let's set a shorter expiration
      const shortFutureTime = Date.now() + 100
      await redis[command]('shortlived', 'value', 'PXAT', shortFutureTime)
      expect(await redis.get('shortlived')).toBe('value')

      await new Promise(resolve => setTimeout(resolve, 200))
      expect(await redis.get('shortlived')).toBe(null)

      redis.disconnect()
    })

    it('should throw an exception if both NX and XX are specified', async () => {
      const redis = new Redis()

      await expect(() => redis[command]('foo', 1, 'NX', 'XX')).rejects.toThrow(
        'ERR syntax error'
      )
      redis.disconnect()
    })

    it('should return null if XX is specified and the key does not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('foo', 1, 'XX')).toBe(null)
      redis.disconnect()
    })

    it('should return null if NX is specified and the key already exists', async () => {
      const redis = new Redis()
      await redis[command]('foo', 'bar')

      expect(await redis[command]('foo', 1, 'NX')).toBe(null)
      redis.disconnect()
    })

    it('should return null if GET is specified and the key does not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('foo', 1, 'GET')).toBe(null)
      redis.disconnect()
    })

    it('should return previous value if GET is specified and the key already exists', async () => {
      const redis = new Redis()
      await redis[command]('foo', 'bar')

      expect(equals(await redis[command]('foo', 1, 'GET'), 'bar')).toBe(true)
      redis.disconnect()
    })

    it('should return previous value if NX && GET is specified and the key already exists', async () => {
      const redis = new Redis()
      await redis[command]('foo', 'bar')

      expect(equals(await redis[command]('foo', 1, 'NX', 'GET'), 'bar')).toBe(
        true
      )
      redis.disconnect()
    })

    it('should return null if NX && GET is specified and the key does not exist', async () => {
      const redis = new Redis()

      expect(await redis[command]('foo', 1, 'NX', 'GET')).toBe(null)
      redis.disconnect()
    })

    it('should work with PXAT and GET combination', async () => {
      const redis = new Redis()
      await redis[command]('foo', 'original')
      const futureTime = Date.now() + 10000

      expect(
        equals(
          await redis[command]('foo', 'new', 'PXAT', futureTime, 'GET'),
          'original'
        )
      ).toBe(true)
      expect(await redis.get('foo')).toBe('new')
      expect(await redis.pttl('foo')).toBeGreaterThanOrEqual(1)
      redis.disconnect()
    })

    it('should work with EXAT and NX combination', async () => {
      const redis = new Redis()
      const futureTime = Math.floor(Date.now() / 1000) + 10

      expect(
        equals(
          await redis[command]('newkey', 'value', 'EXAT', futureTime, 'NX'),
          'OK'
        )
      ).toBe(true)
      expect(await redis.get('newkey')).toBe('value')
      expect(await redis.ttl('newkey')).toBeGreaterThanOrEqual(1)
      redis.disconnect()
    })
  })
})

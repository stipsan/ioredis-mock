import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('getex', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return null on keys that do not exist', async () => {
      expect(await redis[command]('foo')).toBe(null)
    })

    it('should return value of key', async () => {
      await redis.set('foo', 'bar')

      expect(equals(await redis[command]('foo'), 'bar')).toBe(true)
    })

    it('should remove expire status on key', async () => {
      await redis.set('foo', 'bar')
      await redis.expire('foo', 1)

      expect(equals(await redis[command]('foo', 'persist'), 'bar')).toBe(true)
      expect(await redis.ttl('foo')).toBe(-1)
    })

    it('EX should delete key on get', async () => {
      await redis.set('foo', 'bar')

      const beforeExpire = await redis[command]('foo', 'EX', 1)

      await new Promise(resolve => {
        return setTimeout(resolve, 1500)
      })

      expect(equals(beforeExpire, 'bar')).toBe(true)
      expect(await redis.get('foo')).toBe(null)
    })

    it('PX should delete key on get', async () => {
      await redis.set('foo', 'bar')

      const beforeExpire = await redis[command]('foo', 'PX', 100)

      await new Promise(resolve => {
        return setTimeout(resolve, 200)
      })

      expect(equals(beforeExpire, 'bar')).toBe(true)
      expect(await redis.get('foo')).toBe(null)
    })

    it('EXAT should set expire status on key', async () => {
      await redis.set('foo', 'bar')
      const at = Math.ceil(Date.now() / 1000) + 1

      expect(equals(await redis[command]('foo', 'EXAT', at), 'bar')).toBe(true)
      expect(await redis.ttl('foo')).toBeGreaterThanOrEqual(1)
    })

    it('PXAT should set expire status on key', async () => {
      await redis.set('foo', 'bar')
      const at = Date.now() + 100

      expect(equals(await redis[command]('foo', 'PXAT', at), 'bar')).toBe(true)
      expect(await redis.pttl('foo')).toBeGreaterThanOrEqual(1)

      await new Promise(resolve => {
        return setTimeout(resolve, 200)
      })

      expect(await redis.get('foo')).toBe(null)
    })
  })
})

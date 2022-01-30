import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('renamenx', command => {
  describe(command, () => {
    it('should return integer 1 on key rename', async () => {
      const redis = new Redis()
      await redis.set('foo', 'baz')

      expect(await redis[command]('foo', 'bar')).toBe(1)

      expect(await redis.get('foo')).toBe(null)
      expect(await redis.get('bar')).toBe('baz')

      redis.disconnect()
    })

    it('should return integer 0 if new key already exist', async () => {
      const redis = new Redis()
      await redis.set('foo', 'baz')
      await redis.set('bar', 'foobar')

      expect(await redis[command]('foo', 'bar')).toBe(0)

      expect(await redis.get('foo')).not.toBe(null)
      expect(await redis.get('bar')).not.toBe('baz')

      redis.disconnect()
    })
  })
})

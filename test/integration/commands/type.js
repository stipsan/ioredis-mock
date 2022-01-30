import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('type', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    test('should return none when key does not exist', async () => {
      expect(equals(await redis[command]('nope'), 'none')).toBe(true)
    })

    test('should return string', async () => {
      await redis.set('mystring', 'foo')

      expect(equals(await redis[command]('mystring'), 'string')).toBe(true)
    })

    test('should return list', async () => {
      await redis.lpush('mylist', 'foo')

      expect(equals(await redis[command]('mylist'), 'list')).toBe(true)
    })

    test('should return set', async () => {
      await redis.sadd('myset', 'foo')

      expect(equals(await redis[command]('myset'), 'set')).toBe(true)
    })

    test('should return hash', async () => {
      await redis.hset('myhash', 'foo', 'bar')

      expect(equals(await redis[command]('myhash'), 'hash')).toBe(true)
    })

    test('should return zset', async () => {
      await redis.zadd('myzset', '1', 'foo')

      expect(equals(await redis[command]('myzset'), 'zset')).toBe(true)
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

const TEST_TIMEOUT = 5000

runTwinSuite('brpoplpush', (command, equals) => {
  browserSafeDescribe(command)(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    it('should remove one item from the tail of the source list', async () => {
      await redis.rpush('foo', 'foo', 'bar')

      await redis[command]('foo', 'bar', 1)
      expect(await redis.lrange('foo', 0, -1)).toEqual(['foo'])
    })

    it('should add one item to the head of the destination list', async () => {
      await redis.rpush('foo', 'foo', 'bar')
      await redis.rpush('bar', 'baz')

      await redis[command]('foo', 'bar', 1)
      expect(await redis.lrange('bar', 0, -1)).toEqual(['bar', 'baz'])
    })

    it(
      'should return null if the source list does not exist',
      async () => {
        expect(await redis[command]('foo', 'bar', 1)).toEqual(null)
      },
      TEST_TIMEOUT
    )

    // @TODO Skipped because there's a bug in our implementation
    ;(process.env.IS_E2E ? it : it.skip)(
      'should return null if the source list is empty',
      async () => {
        const redis = new Redis({ data: { foo: [] } })

        expect(await redis[command]('foo', 'bar', 1)).toEqual(null)
        redis.disconnect()
      },
      TEST_TIMEOUT
    )

    it(
      'should return the item',
      async () => {
        await redis.rpush('foo', 'foo', 'bar')

        expect(equals(await redis[command]('foo', 'bar', 1), 'bar')).toBe(true)
      },
      TEST_TIMEOUT
    )

    // TODO Skipped because there's a bug in our implementation
    ;(process.env.IS_E2E ? it : it.skip)(
      'should return buffer values correctly',
      async () => {
        const bufferVal = Buffer.from('bar')

        await redis.rpush('foo', 'foo', bufferVal)
        const result = await redis[command]('foo', bufferVal, 1)
        expect(equals(result, 'bar')).toBe(true)
      }
    )

    it('should throw an exception if the source key contains something other than a list', async () => {
      await redis.set('foo', 'not a list')

      await expect(() =>
        redis[command]('foo', 'bar', 1)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"WRONGTYPE Operation against a key holding the wrong kind of value"'
      )
    })

    it('should resolve to null if the destination key contains something other than a list', async () => {
      await redis.set('bar', 'not a list')

      expect(await redis[command]('foo', 'bar', 1)).toBe(null)
    })
  })
})

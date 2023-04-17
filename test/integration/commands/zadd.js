import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('zadd', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should add 1 item to sorted set', async () => {
      const status = await redis[command]('foos', '1', 'foo')
      expect(status).toBe(1)

      expect(await redis.zrange('foos', 0, -1)).toEqual(['foo'])
    })
    it('should add 2 items to sorted set', async () => {
      const status = await redis[command]('foos', '1', 'foo', '2', 'baz')
      expect(status).toBe(2)

      expect(await redis.zrange('foos', 0, -1)).toEqual(['foo', 'baz'])
    })
    it('should not increase length when adding duplicates', async () => {
      const status = await redis[command]('key', '1', 'value', '1', 'value')
      expect(status).toBe(1)

      expect(await redis.zrange('key', 0, -1)).toEqual(['value'])
    })
    it('should not allow nx and xx options in the same call', async () => {
      await expect(
        redis[command]('key', ['NX', 'XX'], 1, 'value')
      ).rejects.toThrow('not compatible')
    })
    it('should not allow GT and LT options in the same call', async () => {
      await expect(
        redis[command]('key', ['GT', 'LT'], 1, 'value')
      ).rejects.toThrow('not compatible')
    })
    it('should not update a value that exists with NX option', async () => {
      await redis[command]('key', 'NX', 1, 'value')
      expect(await redis[command]('key', 'NX', 2, 'value')).toBe(0)
    })
    it('should return updated + added with CH option', async () => {
      await redis[command]('key', 1, 'value')
      expect(await redis[command]('key', 'CH', 3, 'value', 2, 'value2')).toBe(2)
    })
    it('should only update elements that already exist with XX option', async () => {
      await redis[command]('key', 1, 'value')
      expect(await redis[command]('key', ['XX', 'CH'], 2, 'value')).toBe(1)
    })
    it('should not update a value with equal or lower score with LT option', async () => {
      await redis[command]('key', 'LT', 2, 'value')
      expect(await redis[command]('key', 'LT', 2, 'value')).toBe(0)
      expect(await redis[command]('key', 'LT', 3, 'value')).toBe(0)
      expect(await redis[command]('key', 'LT', 1, 'value')).toBe(1)
    })
    it('should not update a value with equal or higher score with GT option', async () => {
      await redis[command]('key', 'GT', 2, 'value')
      expect(await redis[command]('key', 'GT', 2, 'value')).toBe(0)
      expect(await redis[command]('key', 'GT', 1, 'value')).toBe(0)
      expect(await redis[command]('key', 'GT', 3, 'value')).toBe(1)
    })
    it('should handle INCR and LT option', async () => {
      await redis[command]('key', 2, 'value')
      // LT + INCR should never work
      expect(await redis[command]('key', 'LT', 'INCR', 0, 'value')).toBe(0)
    })
    it('should handle INCR and GT option', async () => {
      await redis[command]('key', 2, 'value')
      expect(await redis[command]('key', 'GT', 'INCR', 3, 'value')).toBe(1)
      expect(await redis.zrange('key', 0, -1, 'WITHSCORES')).toEqual([
        'value',
        '3',
      ])
      // should work even if specified score is lower
      expect(await redis[command]('key', 'GT', 'INCR', 1, 'value')).toBe(1)
      expect(await redis.zrange('key', 0, -1, 'WITHSCORES')).toEqual([
        'value',
        '4',
      ])
    })
    it('should handle INCR option', async () => {
      await redis[command]('key', 1, 'value')
      await redis[command]('key', 'INCR', 2, 'value')

      expect(await redis.zrange('key', 0, -1, 'WITHSCORES')).toEqual([
        'value',
        '3',
      ])
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('zdiff', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('throws if not enough keys', () => {
      redis
        .zdiff(1, 'key1')
        .catch(err =>
          expect(err.toString()).toContain(
            "ERR wrong number of arguments for 'zdiff' command"
          )
        )
    })

    it('throws if not enough keys with scores', () => {
      redis
        .zdiff(1, 'key1', 'WITHSCORES')
        .catch(err =>
          expect(err.toString()).toContain(
            "ERR wrong number of arguments for 'zdiff' command"
          )
        )
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)('throws if numkeys is wrong', () => {
      redis
        .zdiff(1, 'key1', 'key2')
        .catch(err =>
          expect(err.toString()).toContain(
            'ERR numkeys must match the number of keys'
          )
        )
      redis
        .zdiff(2, 'key1', 'key2')
        .catch(err =>
          expect(err.toString()).toContain(
            'ERR numkeys must match the number of keys'
          )
        )
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'throws if numkeys is wrong with scores',
      () => {
        redis
          .zdiff(1, 'key1', 'key2', 'WITHSCORES')
          .catch(err =>
            expect(err.toString()).toContain(
              'ERR numkeys must match the number of keys'
            )
          )
        redis
          .zdiff(2, 'key1', 'key2', 'WITHSCORES')
          .catch(err =>
            expect(err.toString()).toContain(
              'ERR numkeys must match the number of keys'
            )
          )
      }
    )

    it('should return diff between two keys', async () => {
      await redis.zadd('key1', 1, 'a', 2, 'b', 3, 'c', 4, 'd')
      await redis.zadd('key2', 3, 'a', 4, 'd')

      const members = await redis.zdiff(2, 'key1', 'key2')
      expect(members).toEqual(['b', 'c'])
    })

    it('should return diff between two keys with scores', async () => {
      await redis.zadd('key1', 1, 'a', 2, 'b', 3, 'c', 4, 'd')
      await redis.zadd('key2', 3, 'a', 4, 'd')

      const members = await redis.zdiff(2, 'key1', 'key2', 'WITHSCORES')
      expect(members).toEqual(['b', '2', 'c', '3'])
    })

    it('should return diff between two keys with no overlap', async () => {
      await redis.zadd('key1', 1, 'a', 2, 'b', 3, 'c', 4, 'd')
      await redis.zadd('key2', 3, 'e', 4, 'f')

      const members = await redis.zdiff(2, 'key1', 'key2')
      expect(members).toEqual(['a', 'b', 'c', 'd'])
    })

    it('should return diff between two keys with no overlap with scores', async () => {
      await redis.zadd('key1', 1, 'a', 2, 'b', 3, 'c', 4, 'd')
      await redis.zadd('key2', 3, 'e', 4, 'f')

      const members = await redis.zdiff(2, 'key1', 'key2', 'WITHSCORES')
      expect(members).toEqual(['a', '1', 'b', '2', 'c', '3', 'd', '4'])
    })

    it('should return diff between three keys', async () => {
      await redis.zadd('key1', 1, 'a', 2, 'b', 3, 'c', 4, 'd')
      await redis.zadd('key2', 3, 'a', 4, 'd')
      await redis.zadd('key2', 5, 'a', 6, 'c')

      const members = await redis.zdiff(3, 'key1', 'key2', 'key3')
      expect(members).toEqual(['b'])
    })

    it('should return diff between three keys with scores', async () => {
      await redis.zadd('key1', 1, 'a', 2, 'b', 3, 'c', 4, 'd')
      await redis.zadd('key2', 3, 'a', 4, 'd')
      await redis.zadd('key2', 5, 'a', 6, 'c')

      const members = await redis.zdiff(3, 'key1', 'key2', 'key3', 'WITHSCORES')
      expect(members).toEqual(['b', '2'])
    })
  })
})

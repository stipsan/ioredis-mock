import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lpos', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    it('should return null when the list does not exist', () => {
      return redis[command]('nonexistent', 'element').then(result =>
        expect(result).toBe(null)
      )
    })

    it('should return null when element is not found', async () => {
      await redis.lpush('mylist', 'a', 'b', 'c')

      return redis[command]('mylist', 'd').then(result =>
        expect(result).toBe(null)
      )
    })

    it('should return the index of the first occurrence', async () => {
      await redis.del('mylist')
      await redis.lpush('mylist', 'c', 'b', 'a', 'b') // list is now [b, a, b, c]

      return redis[command]('mylist', 'b').then(result =>
        expect(result).toBe(0)
      )
    })

    it('should return the correct index for elements', async () => {
      await redis.del('mylist')
      await redis.lpush('mylist', 'd', 'c', 'b', 'a') // list is now [a, b, c, d]

      expect(await redis[command]('mylist', 'a')).toBe(0)
      expect(await redis[command]('mylist', 'b')).toBe(1)
      expect(await redis[command]('mylist', 'c')).toBe(2)
      expect(await redis[command]('mylist', 'd')).toBe(3)
    })

    it('should support RANK option for positive rank', async () => {
      await redis.del('mylist')
      await redis.rpush('mylist', 'a', 'b', 'a', 'b', 'a') // [a, b, a, b, a]

      expect(await redis[command]('mylist', 'a', 'RANK', 1)).toBe(0)
      expect(await redis[command]('mylist', 'a', 'RANK', 2)).toBe(2)
      expect(await redis[command]('mylist', 'a', 'RANK', 3)).toBe(4)
      expect(await redis[command]('mylist', 'a', 'RANK', 4)).toBe(null)
    })

    it('should support RANK option for negative rank', async () => {
      await redis.del('mylist')
      await redis.rpush('mylist', 'a', 'b', 'a', 'b', 'a') // [a, b, a, b, a]

      expect(await redis[command]('mylist', 'a', 'RANK', -1)).toBe(4)
      expect(await redis[command]('mylist', 'a', 'RANK', -2)).toBe(2)
      expect(await redis[command]('mylist', 'a', 'RANK', -3)).toBe(0)
      expect(await redis[command]('mylist', 'a', 'RANK', -4)).toBe(null)
    })

    it('should support COUNT option', async () => {
      await redis.del('mylist')
      await redis.rpush('mylist', 'a', 'b', 'a', 'b', 'a') // [a, b, a, b, a]

      expect(await redis[command]('mylist', 'a', 'COUNT', 0)).toEqual([0, 2, 4])
      expect(await redis[command]('mylist', 'a', 'COUNT', 1)).toEqual([0])
      expect(await redis[command]('mylist', 'a', 'COUNT', 2)).toEqual([0, 2])
      expect(await redis[command]('mylist', 'a', 'COUNT', 3)).toEqual([0, 2, 4])
      expect(await redis[command]('mylist', 'a', 'COUNT', 10)).toEqual([
        0, 2, 4,
      ])
    })

    it('should support COUNT with RANK option', async () => {
      await redis.del('mylist')
      await redis.rpush('mylist', 'a', 'b', 'a', 'b', 'a') // [a, b, a, b, a]

      expect(
        await redis[command]('mylist', 'a', 'RANK', 2, 'COUNT', 2)
      ).toEqual([2, 4])
      expect(
        await redis[command]('mylist', 'a', 'RANK', -2, 'COUNT', 2)
      ).toEqual([2, 0])
    })

    it('should support MAXLEN option', async () => {
      await redis.del('mylist')
      await redis.rpush('mylist', 'a', 'b', 'a', 'b', 'a') // [a, b, a, b, a]

      expect(await redis[command]('mylist', 'a', 'MAXLEN', 3)).toBe(0)
      expect(
        await redis[command]('mylist', 'a', 'MAXLEN', 3, 'COUNT', 2)
      ).toEqual([0, 2])
      expect(await redis[command]('mylist', 'a', 'MAXLEN', 1)).toBe(0)
      expect(await redis[command]('mylist', 'b', 'MAXLEN', 1)).toBe(null)
    })

    it('should combine all options correctly', async () => {
      await redis.del('mylist')
      await redis.rpush('mylist', 'a', 'b', 'a', 'b', 'a', 'c', 'a') // [a, b, a, b, a, c, a]

      // RANK 2, COUNT 2, MAXLEN 5 should find 'a' at positions 0,2,4 in first 5 elements
      // Then take from rank 2 (index 2) and return 2 results: [2, 4]
      expect(
        await redis[command]('mylist', 'a', 'RANK', 2, 'COUNT', 2, 'MAXLEN', 5)
      ).toEqual([2, 4])
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw error for invalid RANK',
      async () => {
        await redis.del('mylist')
        await redis.rpush('mylist', 'a', 'b', 'c')

        return redis[command]('mylist', 'a', 'RANK', 0).catch(err =>
          expect(err.message).toBe(
            'ERR RANK can not be zero: use 1 to start from the first match, 2 from the second ... or use negative to start from the end of the list'
          )
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw error for negative COUNT',
      async () => {
        await redis.del('mylist')
        await redis.rpush('mylist', 'a', 'b', 'c')

        return redis[command]('mylist', 'a', 'COUNT', -1).catch(err =>
          expect(err.message).toBe('ERR COUNT can not be negative')
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw error for negative MAXLEN',
      async () => {
        await redis.del('mylist')
        await redis.rpush('mylist', 'a', 'b', 'c')

        return redis[command]('mylist', 'a', 'MAXLEN', -1).catch(err =>
          expect(err.message).toBe('ERR MAXLEN can not be negative')
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if the key contains something other than a list',
      () => {
        const redis = new Redis({
          data: {
            foo: 'not a list',
          },
        })

        return redis[command]('foo', 'element').catch(err =>
          expect(err.message).toBe('Key foo does not contain a list')
        )
      }
    )

    it('should return empty array with COUNT when element not found', async () => {
      await redis.del('mylist')
      await redis.rpush('mylist', 'a', 'b', 'c')

      expect(await redis[command]('mylist', 'd', 'COUNT', 1)).toEqual([])
    })

    it('should return empty array with COUNT when list is empty', () => {
      return redis[command]('nonexistent', 'element', 'COUNT', 1).then(result =>
        expect(result).toEqual([])
      )
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hrandfield', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return null on a key that does not exist', async () => {
      expect(await redis[command]('coin')).toBe(null)
    })

    it("throws if the key isn't a hash", async () => {
      expect.hasAssertions()
      await redis.set('coin', 'bar')
      try {
        await redis[command]('coin')
      } catch (err) {
        expect(err.message).toBe(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      }
    })

    it('should return a random field from the hset', async () => {
      await redis.hset(
        'coin',
        'heads',
        'observe',
        'tails',
        'reverse',
        'edge',
        null
      )

      const result = await redis[command]('coin')
      expect(['heads', 'tails', 'edge']).toContain(
        Buffer.isBuffer(result) ? result.toString() : result
      )
    })

    describe('positive count', () => {
      it('no repeated fields', async () => {
        await redis.hset(
          'numbers',
          'one',
          1,
          'two',
          2,
          'three',
          3,
          'four',
          4,
          'five',
          5,
          'six',
          6
        )

        let results = await redis[command]('numbers', 5)
        if (command === 'hrandfieldBuffer') {
          results = results.map(r => {
            return r.toString()
          })
        }

        expect(results.length).toBe(5)
        const uniqueResults = new Set(results)
        expect(uniqueResults.size).toBe(results.length)
        expect(results).toContainEqual(expect.any(String))
      })

      it('handles WITHVALUES', async () => {
        await redis.hset(
          'numbers',
          'one',
          'a',
          'two',
          'a',
          'three',
          'a',
          'four',
          'b',
          'five',
          'b',
          'six',
          'b'
        )

        let results = await redis[command]('numbers', 5, 'withvalues')
        if (command === 'hrandfieldBuffer') {
          results = results.map(r => {
            return r.toString()
          })
        }

        expect(results.length).toBe(10)
        const uniqueResults = new Map()
        results.forEach((key, index) => {
          if (index % 2 === 0) {
            uniqueResults.set(key, results[index + 1])
          }
        })
        expect(uniqueResults.size * 2).toBe(results.length)
        expect(results).toContainEqual(expect.any(String))
      })

      it('will return the whole hash if count is bigger than the number of fields', async () => {
        await redis.hset(
          'numbers',
          'one',
          1,
          'two',
          2,
          'three',
          3,
          'four',
          4,
          'five',
          5,
          'six',
          6
        )

        let results = await redis[command]('numbers', 10)
        if (command === 'hrandfieldBuffer') {
          results = results.map(r => {
            return r.toString()
          })
        }

        expect(results.length).toBe(6)
        const uniqueResults = new Set(results)
        expect(uniqueResults.size).toBe(results.length)
        expect(results).toContainEqual(expect.any(String))
      })
    })
    describe('negative count', () => {
      it('repeated fields are possible', async () => {
        await redis.hset(
          'numbers',
          'one',
          1,
          'two',
          2,
          'three',
          3,
          'four',
          4,
          'five',
          5,
          'six',
          6
        )

        let results = await redis[command]('numbers', -5)
        if (command === 'hrandfieldBuffer') {
          results = results.map(r => {
            return r.toString()
          })
        }

        expect(results.length).toBe(5)
        const uniqueResults = new Set(results)
        expect(uniqueResults.size).toBeLessThanOrEqual(results.length)
        expect(results).toContainEqual(expect.any(String))
      })

      it('handles WITHVALUES', async () => {
        await redis.hset(
          'numbers',
          'one',
          'a',
          'two',
          'a',
          'three',
          'a',
          'four',
          'b',
          'five',
          'b',
          'six',
          'b'
        )

        let results = await redis[command]('numbers', -5, 'withvalues')
        if (command === 'hrandfieldBuffer') {
          results = results.map(r => {
            return r.toString()
          })
        }

        expect(results.length).toBe(10)
        const uniqueResults = new Map()
        results.forEach((key, index) => {
          if (index % 2 === 0) {
            uniqueResults.set(key, results[index + 1])
          }
        })

        expect(uniqueResults.size * 2).toBeLessThanOrEqual(results.length)
        expect(results).toContainEqual(expect.any(String))
      })

      it('always returns an array with the same length as count', async () => {
        await redis.hset(
          'numbers',
          'one',
          1,
          'two',
          2,
          'three',
          3,
          'four',
          4,
          'five',
          5,
          'six',
          6
        )

        let results = await redis[command]('numbers', -10)
        if (command === 'hrandfieldBuffer') {
          results = results.map(r => {
            return r.toString()
          })
        }

        expect(results.length).toBe(10)
        const uniqueResults = new Set(results)
        expect(uniqueResults.size).toBeLessThan(results.length)
        expect(results).toContainEqual(expect.any(String))
      })
    })
  })
})

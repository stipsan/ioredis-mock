import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('spop', command => {
  describe(command, () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)('should return a random item', () => {
      const redis = new Redis({
        data: {
          myset: new Set(['one', 'two', 'three']),
        },
      })

      return redis[command]('myset').then(_result => {
        const result = Buffer.isBuffer(_result) ? _result.toString() : _result
        expect(result.constructor).toBe(String)
        expect(['one', 'two', 'three']).toContain(result)
        expect(redis.data.get('myset').size).toBe(2)
      })
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should not return an array when count == set.size == 1',
      () => {
        const redis = new Redis({
          data: {
            myset: new Set(['one']),
          },
        })

        return redis[command]('myset').then(_result => {
          const result = Buffer.isBuffer(_result) ? _result.toString() : _result
          expect(result.constructor).toBe(String)
          expect(result).toBe('one')
          expect(redis.data.get('myset').size).toBe(0)
        })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return random unique items',
      () => {
        const redis = new Redis({
          data: {
            myset: new Set(['one', 'two', 'three']),
          },
        })

        return redis[command]('myset', 2).then(_results => {
          const results = Buffer.isBuffer(_results[0])
            ? _results.map(result => result.toString())
            : _results
          expect(['one', 'two', 'three']).toContain(results[0])
          expect(['one', 'two', 'three']).toContain(results[1])
          expect(redis.data.get('myset').size).toBe(1)
        })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return all items if positive count is bigger than set',
      () => {
        const redis = new Redis({
          data: {
            myset: new Set(['one', 'two', 'three']),
          },
        })

        return redis[command]('myset', 5).then(_results => {
          const results = Buffer.isBuffer(_results[0])
            ? _results.map(result => result.toString())
            : _results
          expect(results).toEqual(['one', 'two', 'three'])
          expect(redis.data.get('myset').size).toBe(0)
        })
      }
    )

    it('should return null if set is empty', () => {
      const redis = new Redis()

      return redis[command]('myset').then(result => expect(result).toBe(null))
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return undefined if count is 0',
      () => {
        const redis = new Redis({
          data: {
            myset: new Set(['one', 'two', 'three']),
          },
        })

        return redis[command]('myset', 0).then(result =>
          expect(result).toBe(undefined)
        )
      }
    )

    it('should throw an exception if the key contains something other than a set', () => {
      const redis = new Redis({
        data: {
          foo: 'not a set',
        },
      })

      return redis[command]('foo').catch(err =>
        expect(err.message).toBe('Key foo does not contain a set')
      )
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if count is not an integer',
      () => {
        const redis = new Redis({
          data: {
            myset: new Set(['one', 'two', 'three']),
          },
        })

        return redis[command]('myset', 'not an integer').catch(err =>
          expect(err.message).toBe(
            'ERR value is not an integer or out of range'
          )
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if count is out of range',
      () => {
        const redis = new Redis({
          data: {
            myset: new Set(['one', 'two', 'three']),
          },
        })

        return redis[command]('myset', -10).catch(err =>
          expect(err.message).toBe(
            'ERR value is not an integer or out of range'
          )
        )
      }
    )
  })
})

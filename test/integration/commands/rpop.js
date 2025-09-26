import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('rpop', (command, equals) => {
  describe(command, () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should remove and return last element of list',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3'],
          },
        })

        return redis[command]('foo')
          .then(result => expect(equals(result, '3')).toBe(true))
          .then(async () => expect(redis.data.get('foo')).toEqual(['1', '2']))
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return buffer values correctly',
      () => {
        const bufferVal = Buffer.from('bar')
        const redis = new Redis({
          data: {
            foo: ['1', '2', bufferVal],
          },
        })

        return redis[command]('foo').then(result =>
          expect(equals(result, bufferVal)).toBe(true)
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return null on empty list',
      () => {
        const redis = new Redis({
          data: {
            foo: [],
          },
        })

        return redis[command]('foo').then(result => expect(result).toBe(null))
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

        return redis[command]('foo').catch(err =>
          expect(err.message).toBe('Key foo does not contain a list')
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return multiple elements when count is provided',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3', '4', '5'],
          },
        })

        return redis[command]('foo', 3).then(result => {
          expect(Array.isArray(result)).toBe(true)
          if (command === 'rpopBuffer') {
            expect(result.length).toBe(3)
            expect(Buffer.isBuffer(result[0])).toBeTruthy()
            expect(result[0].toString()).toBe('3')
            expect(result[1].toString()).toBe('4')
            expect(result[2].toString()).toBe('5')
          } else {
            expect(result).toEqual(['3', '4', '5'])
          }
          return expect(redis.data.get('foo')).toEqual(['1', '2'])
        })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return all elements when count is larger than list size',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2'],
          },
        })

        return redis[command]('foo', 5).then(result => {
          expect(Array.isArray(result)).toBe(true)
          if (command === 'rpopBuffer') {
            expect(result.length).toBe(2)
            expect(Buffer.isBuffer(result[0])).toBeTruthy()
            expect(result[0].toString()).toBe('1')
            expect(result[1].toString()).toBe('2')
          } else {
            expect(result).toEqual(['1', '2'])
          }
          return expect(redis.data.get('foo')).toEqual([])
        })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return null when count is 0',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3'],
          },
        })

        return redis[command]('foo', 0).then(result => {
          expect(result).toBe(null)
          return expect(redis.data.get('foo')).toEqual(['1', '2', '3'])
        })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return null when count is provided on empty list',
      () => {
        const redis = new Redis({
          data: {
            foo: [],
          },
        })

        return redis[command]('foo', 3).then(result =>
          expect(result).toBe(null)
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw error for invalid count values',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3'],
          },
        })

        return redis[command]('foo', -1).catch(err =>
          expect(err.message).toBe(
            'ERR value is not an integer or out of range'
          )
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw error for non-numeric count values',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3'],
          },
        })

        return redis[command]('foo', 'invalid').catch(err =>
          expect(err.message).toBe(
            'ERR value is not an integer or out of range'
          )
        )
      }
    )
  })
})

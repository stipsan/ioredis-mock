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
          expect(result).toBe(bufferVal)
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
      'should remove and return "count" elements from the end if second argument is provided',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3', '4', '5'],
          },
        })

        return redis[command]('foo', 2)
          .then(result =>
            expect(
              result.map(v => (Buffer.isBuffer(v) ? v.toString() : v))
            ).toEqual(['5', '4'])
          )
          .then(() => expect(redis.data.get('foo')).toEqual(['1', '2', '3']))
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance  
    ;(process.env.IS_E2E ? it.skip : it)(
      'should remove key and return all elements on larger number if second argument is provided',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3', '4', '5'],
          },
        })

        return redis[command]('foo', 7)
          .then(result =>
            expect(
              result.map(v => (Buffer.isBuffer(v) ? v.toString() : v))
            ).toEqual(['5', '4', '3', '2', '1'])
          )
          .then(() => redis.exists('foo'))
          .then(status => expect(status).toBe(0))
      }
    )
  })
})

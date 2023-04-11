import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lpop', (command, equals) => {
  describe(command, () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should remove and return first element of list',
      () => {
        const redis = new Redis({
          data: {
            foo: ['3', '2', '1'],
          },
        })

        return redis[command]('foo')
          .then(result => expect(equals(result, '3')).toBe(true))
          .then(() => expect(redis.data.get('foo')).toEqual(['2', '1']))
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return buffer values correctly as buffer',
      () => {
        const bufferVal = Buffer.from('bar')
        const redis = new Redis({
          data: {
            foo: [bufferVal, '2', '1'],
          },
        })
        return redis[command]('foo')
          .then(result => {
            expect(Buffer.isBuffer(result)).toBeTruthy()
            expect(result).toEqual(bufferVal)
            return redis[command]('foo')
          })
          .then(result => {
            expect(equals(result, '2')).toBe(true)
          })
      }
    )

    it('should return null on empty list', () => {
      const redis = new Redis({
        data: {
          foo: [],
        },
      })

      return redis[command]('foo').then(result => expect(result).toBe(null))
    })

    it('should throw an exception if the key contains something other than a list', () => {
      const redis = new Redis({
        data: {
          foo: 'not a list',
        },
      })

      return redis[command]('foo').catch(err =>
        expect(err.message).toBe('Key foo does not contain a list')
      )
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('rpop', command => {
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
          .then(result => expect(result).toBe('3'))
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

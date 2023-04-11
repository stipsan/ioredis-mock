import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lset', (command, equals) => {
  describe(command, () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should set the list element at index to value',
      () => {
        const redis = new Redis({
          data: {
            mylist: ['one', 'two', 'three'],
          },
        })

        return redis[command]('mylist', 0, 'four')
          .then(result => expect(equals(result, 'OK')).toBe(true))
          .then(() => redis[command]('mylist', -2, 'five'))
          .then(result => expect(equals(result, 'OK')).toBe(true))
          .then(() =>
            expect(redis.data.get('mylist')).toEqual(['four', 'five', 'three'])
          )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if the key does not exist',
      () => {
        const redis = new Redis()

        return redis[command]('mylist', 0, 'foo').catch(err =>
          expect(err.message).toBe('no such key')
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

        return redis[command]('foo', 0, 'bar').catch(err =>
          expect(err.message).toBe('Key foo does not contain a list')
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw errors when index is out of range',
      () => {
        const redis = new Redis({
          data: {
            mylist: ['one', 'two', 'three'],
          },
        })

        return redis[command]('mylist', 5, 'four')
          .catch(err => {
            expect(err.message).toBe('index out of range')

            return redis[command]('mylist', -5, 'five')
          })
          .catch(err => expect(err.message).toBe('index out of range'))
      }
    )
  })
})

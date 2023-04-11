import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('smove', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should move value from source to destination',
      () => {
        const redis = new Redis({
          data: {
            foo: new Set(['one', 'two', 'three']),
          },
        })

        return redis[command]('foo', 'bar', 'two')
          .then(status => expect(status).toBe(1))
          .then(() => {
            expect(redis.data.get('foo').has('two')).toBe(false)
            expect(redis.data.get('bar').has('two')).toBe(true)
          })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return 0 if member does not exist in source',
      () => {
        const redis = new Redis({
          data: {
            foo: new Set(['one', 'three']),
          },
        })

        return redis[command]('foo', 'bar', 'two')
          .then(status => expect(status).toBe(0))
          .then(() => expect(redis.data.has('bar')).toBe(false))
      }
    )

    it('should return 0 if source does not exist', () => {
      return redis[command]('foo', 'bar', 'two').then(status =>
        expect(status).toBe(0)
      )
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if the source contains something other than a set',
      () => {
        const redis = new Redis({
          data: {
            foo: 'not a set',
          },
        })

        return redis[command]('foo', 'bar', 'two').catch(err =>
          expect(err.message).toBe('Key foo does not contain a set')
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if the destination contains something other than a set',
      () => {
        const redis = new Redis({
          data: {
            foo: new Set(),
            bar: 'not a set',
          },
        })

        return redis[command]('foo', 'bar', 'two').catch(err =>
          expect(err.message).toBe('Key bar does not contain a set')
        )
      }
    )
  })
})

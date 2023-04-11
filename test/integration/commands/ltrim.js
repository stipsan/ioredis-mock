import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('ltrim', (command, equals) => {
  describe(command, () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)('should return first 3 items', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return Promise.all([
        redis[command]('foo', 0, 2).then(res =>
          expect(equals(res, 'OK')).toBe(true)
        ),
        redis
          .lrange('foo', 0, -1)
          .then(res => expect(res).toEqual(['1', '2', '3'])),
      ])
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)('should return last 3 items', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return Promise.all([
        redis[command]('foo', -3, -1).then(res =>
          expect(equals(res, 'OK')).toBe(true)
        ),
        redis
          .lrange('foo', 0, -1)
          .then(res => expect(res).toEqual(['3', '4', '5'])),
      ])
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return all items if start less than 0',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3', '4', '5'],
          },
        })

        return Promise.all([
          redis[command]('foo', -6, -1).then(res =>
            expect(equals(res, 'OK')).toBe(true)
          ),
          redis
            .lrange('foo', 0, -1)
            .then(res => expect(res).toEqual(['1', '2', '3', '4', '5'])),
        ])
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return empty if end - length before start',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3', '4', '5'],
          },
        })

        return Promise.all([
          redis[command]('foo', 0, -6).then(res =>
            expect(equals(res, 'OK')).toBe(true)
          ),
          redis.lrange('foo', 0, -1).then(res => expect(res).toEqual([])),
        ])
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return last all items on larger numbers',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3', '4', '5'],
          },
        })

        return Promise.all([
          redis[command]('foo', 0, 100).then(res =>
            expect(equals(res, 'OK')).toBe(true)
          ),
          redis
            .lrange('foo', 0, -1)
            .then(res => expect(res).toEqual(['1', '2', '3', '4', '5'])),
        ])
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return empty array if out-of-range',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3', '4', '5'],
          },
        })

        return Promise.all([
          redis[command]('foo', 10, 100).then(res =>
            expect(equals(res, 'OK')).toBe(true)
          ),
          redis.lrange('foo', 0, -1).then(res => expect(res).toEqual([])),
        ])
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

        return redis[command]('foo', 0, 2).catch(err =>
          expect(err.message).toBe('Key foo does not contain a list')
        )
      }
    )
  })
})

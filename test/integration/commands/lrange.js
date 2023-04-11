import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lrange', command => {
  describe(command, () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)('should return first 3 items', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return redis[command]('foo', 0, 2).then(res =>
        expect(res.map(v => (Buffer.isBuffer(v) ? v.toString() : v))).toEqual([
          '1',
          '2',
          '3',
        ])
      )
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)('should return last 3 items', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return redis[command]('foo', -3, -1).then(res =>
        expect(res.map(v => (Buffer.isBuffer(v) ? v.toString() : v))).toEqual([
          '3',
          '4',
          '5',
        ])
      )
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return last all items on larger numbers',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1', '2', '3', '4', '5'],
          },
        })

        return redis[command]('foo', 0, 100).then(res =>
          expect(res.map(v => (Buffer.isBuffer(v) ? v.toString() : v))).toEqual(
            ['1', '2', '3', '4', '5']
          )
        )
      }
    )

    it('should return empty array if out-of-range', () => {
      const redis = new Redis({
        data: {
          foo: ['1', '2', '3', '4', '5'],
        },
      })

      return redis[command]('foo', 10, 100).then(res =>
        expect(res.map(v => (Buffer.isBuffer(v) ? v.toString() : v))).toEqual(
          []
        )
      )
    })

    it('should throw an exception if the key contains something other than a list', () => {
      const redis = new Redis({
        data: {
          foo: 'not a list',
        },
      })

      return redis[command]('foo', 0, 2).catch(err =>
        expect(err.message).toBe('Key foo does not contain a list')
      )
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('zcount', command => {
  describe(command, () => {
    const data = {
      foo: new Map([
        ['first', { score: 1, value: 'first' }],
        ['second', { score: 2, value: 'second' }],
        ['third', { score: 3, value: 'third' }],
        ['fourth', { score: 4, value: 'fourth' }],
        ['fifth', { score: 5, value: 'fifth' }],
      ]),
    }
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return using not strict compare',
      () => {
        const redis = new Redis({ data })

        return redis[command]('foo', 1, 3).then(res => expect(res).toEqual(3))
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return using strict compare',
      () => {
        const redis = new Redis({ data })

        return redis[command]('foo', '(3', 5).then(res =>
          expect(res).toEqual(2)
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should accept infinity string',
      () => {
        const redis = new Redis({ data })

        return redis[command]('foo', '-inf', '+inf').then(res =>
          expect(res).toEqual(5)
        )
      }
    )

    it('should return 0 if out-of-range', () => {
      const redis = new Redis({ data })

      return redis[command]('foo', 10, 100).then(res => expect(res).toEqual(0))
    })

    it('should return 0 if key not found', () => {
      const redis = new Redis({ data })

      return redis[command]('boo', 10, 100).then(res => expect(res).toEqual(0))
    })

    it('should return 0 if the key contains something other than a list', () => {
      const redis = new Redis({
        data: {
          foo: 'not a list',
        },
      })

      return redis[command]('foo', 1, 2).then(res => expect(res).toEqual(0))
    })
  })
})

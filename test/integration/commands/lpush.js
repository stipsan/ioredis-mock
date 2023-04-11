import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lpush', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should add the values to the list in the correct order',
      () => {
        const redis = new Redis({
          data: {
            foo: ['1'],
          },
        })

        return redis[command]('foo', 9, 8, 7).then(() =>
          expect(redis.data.get('foo')).toEqual(['7', '8', '9', '1'])
        )
      }
    )

    it('should return the new length of the list', () => {
      return redis[command]('foo', 9, 8, 7).then(length =>
        expect(length).toBe(3)
      )
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if the key contains something other than a list',
      async () => {
        await redis.set('foo', 'not a list')

        return redis[command]('foo', 1).catch(err =>
          expect(err.message).toBe('Key foo does not contain a list')
        )
      }
    )
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('scard', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return the number of items in the set',
      () => {
        const redis = new Redis({
          data: {
            foo: new Set([1, 3, 4]),
          },
        })

        return redis[command]('foo').then(length => expect(length).toBe(3))
      }
    )

    it('should return 0 if the set does not exist', async () => {
      const length = await redis[command]('foo')
      expect(length).toBe(0)
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if the key contains something other than a set',
      () => {
        const redis = new Redis({
          data: {
            foo: 'not a set',
          },
        })

        return redis[command]('foo').catch(err =>
          expect(err.message).toBe('Key foo does not contain a set')
        )
      }
    )
  })
})

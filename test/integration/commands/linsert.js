import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('linsert', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    it('should add the value to the list at the correct position', async () => {
      await redis.lpush('foo', 1)

      return redis[command]('foo', 'BEFORE', 1, 0)
        .then(async () =>
          expect(await redis.lrange('foo', 0, -1)).toEqual(['0', '1'])
        )
        .then(() => redis[command]('foo', 'AFTER', 1, 2))
        .then(async () =>
          expect(await redis.lrange('foo', 0, -1)).toEqual(['0', '1', '2'])
        )
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return the new length of the list',
      () => {
        return redis[command]('foo', 'BEFORE', 1, 0)
          .then(length => expect(length).toBe(-1))
          .then(() => redis.lpush('foo', 1))
          .then(() => redis[command]('foo', 'BEFORE', 1, 0))
          .then(length => expect(length).toBe(2))
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

        return redis[command]('foo', 'BEFORE', 1, 0).catch(err =>
          expect(err.message).toBe('Key foo does not contain a list')
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should throw an exception if the position is not allowed',
      async () => {
        await redis.lpush('foo', 1)

        return redis[command]('foo', 'POSITION_UNKNOWN', 1, 0).catch(err =>
          expect(err.message).toBe(
            'The position of the new element must be BEFORE the pivot or AFTER the pivot'
          )
        )
      }
    )
  })
})

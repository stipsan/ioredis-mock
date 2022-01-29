import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('discard', (command, equals) => {
  describe(command, () => {
    it('should discard any batch queue ', () => {
      const redis = new Redis()

      redis.multi([
        ['incr', 'user_next'],
        ['incr', 'post_next'],
      ])
      return redis[command]().then(result => {
        expect(equals(result, 'OK')).toBe(true)
        expect(redis.batch).toBe(undefined)
      })
    })

    it('errors if you discard without starting a pipeline', () => {
      const redis = new Redis()

      return redis[command]().catch(err => {
        expect(err).toBeInstanceOf(Error)
      })
    })
  })
})

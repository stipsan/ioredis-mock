import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lpushx', command => {
  describe(command, () => {
    it('should add the values to the list in the correct order', () => {
      const redis = new Redis({
        data: {
          foo: ['2'],
        },
      })

      return redis[command]('foo', 1).then(() =>
        expect(redis.data.get('foo')).toEqual(['1', '2'])
      )
    })

    it('should return the new length of the list', () => {
      const redis = new Redis({
        data: {
          foo: ['2'],
        },
      })

      return redis[command]('foo', 1).then(result => expect(result).toBe(2))
    })

    it('should return 0 if list does not exist', () => {
      const redis = new Redis()

      return redis[command]('foo', 1).then(result => expect(result).toBe(0))
    })
  })
})

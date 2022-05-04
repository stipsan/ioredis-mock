import Redis from 'ioredis'
import { convertBufferToString } from 'ioredis/built/utils'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lindex', command => {
  describe(command, () => {
    it('should return item list', async () => {
      const redis = new Redis()
      await redis.lpush('mylist', 'World')
      await redis.lpush('mylist', 'Hello')

      return redis[command]('mylist', 0)
        .then(result => expect(convertBufferToString(result)).toBe('Hello'))
        .then(() => redis[command]('mylist', -1))
        .then(result => expect(convertBufferToString(result)).toBe('World'))
        .then(() => redis[command]('mylist', 3))
        .then(result => expect(result).toBe(null))
    })

    it('should return null if the list does not exist', () => {
      const redis = new Redis()

      return redis[command]('foo', 0).then(result => expect(result).toBe(null))
    })

    // @TODO: fix the implementation
    it.skip('should throw an exception if the key contains something other than a list', async () => {
      const redis = new Redis({
        data: {
          foo: 'not a list',
        },
      })
      await redis.set('foo', 'not a list')

      return redis[command]('foo', 0).catch(err =>
        expect(err.message).toBe('Key foo does not contain a list')
      )
    })
  })
})

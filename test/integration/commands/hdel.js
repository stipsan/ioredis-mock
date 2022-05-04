import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hdel', command => {
  describe(command, () => {
    it('should delete passed in keys from hash map, and when the last key is removed, should remove the hash map itself', async () => {
      const redis = new Redis()
      await redis.hset(
        'user:1',
        'id',
        '1',
        'email',
        'bruce@wayne.enterprises',
        'name',
        'Bruce Wayne'
      )

      return redis[command]('user:1', 'id', 'email', 'location')
        .then(status => expect(status).toBe(2))
        .then(async () =>
          expect(await redis.hget('user:1', 'name')).toEqual('Bruce Wayne')
        )
        .then(() => redis[command]('user:1', 'name'))
        .then(status => expect(status).toBe(1))
        .then(async () =>
          expect(await redis.hget('user:1', 'name')).toEqual(null)
        )
        .then(() => redis.exists('user:1'))
        .then(status => expect(status).toBe(0))
    })

    it('should return 0 for key that does not exist', done => {
      const redis = new Redis()

      redis
        .hset(
          'user:1',
          'id',
          '1',
          'email',
          'bruce@wayne.enterprises',
          'name',
          'Bruce Wayne'
        )
        .then(() =>
          redis[command]('nonExistingUser', 'someField')
            .then(status => expect(status).toBe(0))
            .then(() => done())
            .catch(err => done(err))
        )
    })
  })
})

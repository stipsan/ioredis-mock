import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hdel', command => {
  describe(command, () => {
    it('should delete passed in keys from hash map, and when the last key is removed, should remove the hash map itself', () => {
      const redis = new Redis({
        data: {
          'user:1': {
            id: '1',
            email: 'bruce@wayne.enterprises',
            name: 'Bruce Wayne',
          },
        },
      })
      return redis[command]('user:1', 'id', 'email', 'location')
        .then(status => expect(status).toBe(2))
        .then(() =>
          expect(redis.data.get('user:1')).toEqual({
            name: 'Bruce Wayne',
          })
        )
        .then(() => redis[command]('user:1', 'name'))
        .then(status => expect(status).toBe(1))
        .then(() => redis.exists('user:1'))
        .then(status => expect(status).toBe(0))
    })

    it('should return 0 for key that does not exist', done => {
      const redis = new Redis({
        data: {
          'user:1': {
            id: '1',
            email: 'bruce@wayne.enterprises',
            name: 'Bruce Wayne',
          },
        },
      })
      redis[command]('nonExistingUser', 'someField')
        .then(status => expect(status).toBe(0))
        .then(() => done())
        .catch(err => done(err))
    })
  })
})

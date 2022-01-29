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
        .then(status => {
          return expect(status).toBe(2)
        })
        .then(() => {
          return expect(redis.data.get('user:1')).toEqual({
            name: 'Bruce Wayne',
          })
        })
        .then(() => {
          return redis[command]('user:1', 'name')
        })
        .then(status => {
          return expect(status).toBe(1)
        })
        .then(() => {
          return redis.exists('user:1')
        })
        .then(status => {
          return expect(status).toBe(0)
        })
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
        .then(status => {
          return expect(status).toBe(0)
        })
        .then(() => {
          return done()
        })
        .catch(err => {
          return done(err)
        })
    })
  })
})

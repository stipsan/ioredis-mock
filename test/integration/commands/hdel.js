import Redis from 'ioredis'

describe('hdel', () => {
  const redis = new Redis({
    data: {
      'user:1': {
        id: '1',
        email: 'bruce@wayne.enterprises',
        name: 'Bruce Wayne',
      },
    },
  })
  it('should delete passed in keys from hash map, and when the last key is removed, should remove the hash map itself', () => {
    return redis
      .hdel('user:1', 'id', 'email', 'location')
      .then(status => {
        return expect(status).toBe(2)
      })
      .then(() => {
        return expect(redis.data.get('user:1')).toEqual({ name: 'Bruce Wayne' })
      })
      .then(() => {
        return redis.hdel('user:1', 'name')
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
    redis
      .hdel('nonExistingUser', 'someField')
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

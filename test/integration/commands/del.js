import Redis from 'ioredis'

describe('del', () => {
  const redis = new Redis({
    data: {
      deleteme: 'please',
      metoo: 'pretty please',
    },
  })
  it('should delete passed in keys', () => {
    return redis
      .del('deleteme', 'metoo')
      .then(status => {
        return expect(status).toBe(2)
      })
      .then(() => {
        return expect(redis.data.has('deleteme')).toBe(false)
      })
      .then(() => {
        return expect(redis.data.has('metoo')).toBe(false)
      })
  })
  it('return the number of keys removed', () => {
    return redis.del('deleteme', 'metoo').then(status => {
      return expect(status).toBe(0)
    })
  })
})

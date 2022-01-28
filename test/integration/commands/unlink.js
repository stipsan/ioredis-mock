import Redis from 'ioredis'

describe('unlink', () => {
  const redis = new Redis({
    data: {
      unlinkme: 'please',
      metoo: 'pretty please',
    },
  })
  it('should unlink/delete passed in keys', () => {
    return redis
      .unlink('unlinkme', 'metoo')
      .then(status => {
        return expect(status).toBe(2)
      })
      .then(() => {
        return expect(redis.data.has('unlinkme')).toBe(false)
      })
      .then(() => {
        return expect(redis.data.has('metoo')).toBe(false)
      })
  })
  it('should return the number of keys unlinked', () => {
    return redis.unlink('deleteme', 'metoo').then(status => {
      return expect(status).toBe(0)
    })
  })
})

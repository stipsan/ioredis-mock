import Redis from 'ioredis'

describe('flushall', () => {
  const redis = new Redis({
    data: {
      deleteme: 'please',
      metoo: 'pretty please',
    },
  })
  test('should empty current db', () => {
    return redis
      .flushall()
      .then(status => {
        return expect(status).toBe('OK')
      })
      .then(() => {
        return expect(redis.data.keys().length).toBe(0)
      })
  })
  test.todo('should empty every db')
})

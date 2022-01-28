import Redis from 'ioredis'

describe('decrby', () => {
  it('should decrement an integer with passed decrement', () => {
    const redis = new Redis({
      data: {
        user_next: '11',
      },
    })

    return redis
      .decrby('user_next', 10)
      .then(userNext => {
        return expect(userNext).toBe(1)
      })
      .then(() => {
        return expect(redis.data.get('user_next')).toBe('1')
      })
  })
  it('should not increment if no increment is passed', () => {
    const redis = new Redis({
      data: {
        user_next: '1',
      },
    })

    return redis
      .decrby('user_next')
      .then(userNext => {
        return expect(userNext).toBe(1)
      })
      .then(() => {
        return expect(redis.data.get('user_next')).toBe('1')
      })
  })
})

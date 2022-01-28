import Redis from 'ioredis'

describe('xadd', () => {
  it('should add events to a stream', () => {
    const redis = new Redis()
    return redis
      .xadd('stream', '*', 'key', 'val')
      .then(id => {
        expect(id).toBe('1-0')
        expect(redis.data.get('stream')).toEqual([['1-0', ['key', 'val']]])
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        })
      })
      .then(() => {
        return redis.xadd('stream', '*', 'key', 'val')
      })
      .then(id => {
        expect(id).toBe('2-0')
        expect(redis.data.get('stream')).toEqual([
          ['1-0', ['key', 'val']],
          ['2-0', ['key', 'val']],
        ])
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        })
      })
      .then(() => {
        return redis.xadd(
          'stream',
          'MAXLEN',
          '~',
          '50',
          '*',
          'reading',
          '{"key": "value"}'
        )
      })
      .then(id => {
        expect(id).toBe('MAXLEN-0')
        expect(redis.data.get('stream')).toEqual([
          ['1-0', ['key', 'val']],
          ['2-0', ['key', 'val']],
          ['MAXLEN-0', ['~', '50', '*', 'reading', '{"key": "value"}']],
        ])
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        })
      })
  })

  it('should throw with an illegal amount of arguments', () => {
    const redis = new Redis()
    return Promise.all([
      redis.xadd().catch(err => {
        return err.message
      }),
      redis.xadd('stream').catch(err => {
        return err.message
      }),
      redis.xadd('stream', '*').catch(err => {
        return err.message
      }),
      redis.xadd('stream', '*', 'one').catch(err => {
        return err.message
      }),
    ]).then(errors => {
      return errors.forEach(err => {
        return expect(err).toBe(
          "ERR wrong number of arguments for 'xadd' command"
        )
      })
    })
  })

  it('should throw with a duplicate id', () => {
    const redis = new Redis()
    redis
      .xadd('stream', '*', 'key', 'value')
      .then(id => {
        return redis.xadd('stream', id, 'key', 'value')
      })
      .catch(err => {
        return expect(err.message).toBe(
          'ERR The ID specified in XADD is equal or smaller than the target stream top item'
        )
      })
  })
})

import Redis from 'ioredis'

describe('xadd', () => {
  const redis = new Redis()
  if (!process.env.IS_E2E) jest.useFakeTimers()
  const fixedTimestamp = Date.now()

  afterAll(() => {
    redis.disconnect()
    if (!process.env.IS_E2E) jest.useRealTimers()
  })

  it('should add events with a given and sequential id to a stream', () => {
    return redis
      .xadd('stream', '0-1', 'key', 'val')
      .then(id => {
        expect(id).toBe('0-1')
      })
      .then(() => redis.xadd('stream', '0-2', 'key', 'val'))
      .then(id => {
        expect(id).toBe('0-2')
      })
      .then(() => redis.xadd('stream', '1-0', 'key', 'val'))
      .then(id => {
        expect(id).toBe('1-0')
      })
      .then(() => redis.xadd('stream', '1337-1337', 'key', 'val'))
      .then(id => {
        expect(id).toBe('1337-1337')
      })
  })

  it('should only increment counter when last timestamp is greater than current date', () => {
    return redis
      .xadd('stream', `${fixedTimestamp + 100000}-0`, 'key', 'val')
      .then(id => {
        expect(id).toBe(`${fixedTimestamp + 100000}-0`)
      })
      .then(() => redis.xadd('stream', '*', 'key', 'val'))
      .then(id => {
        expect(id).toBe(`${fixedTimestamp + 100000}-1`)
      })
  })

  it('should correctly generate ids on capped streams', () => {
    return redis
      .xadd('stream', 'MAXLEN', '=', '2', '*', 'key', 'val')
      .then(id => {
        expect(id).toBe(`${fixedTimestamp}-0`)
      })
      .then(() => redis
        .xadd('stream', 'MAXLEN', '=', '1', '*', 'key', 'val'))
      .then(id => {
        expect(id).toBe(`${fixedTimestamp}-1`)
      }).then(() => redis
        .xadd('stream', 'MAXLEN', '=', '2', '*', 'key', 'val'))
      .then(id => {
        expect(id).toBe(`${fixedTimestamp}-2`)
      }).then(() => redis
        .xadd('stream', 'MAXLEN', '=', '1', '*', 'key', 'val'))
      .then(id => {
        expect(id).toBe(`${fixedTimestamp}-3`)
      })
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;
  (process.env.IS_E2E ? it.skip : it)('should add events to a stream', () => {
    return redis
      .xadd('stream', '*', 'key', 'val')
      .then(id => {
        expect(id).toBe(`${fixedTimestamp}-0`)
        expect(redis.data.get('stream')).toEqual([
          [`${fixedTimestamp}-0`, ['key', 'val']],
        ])
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        })
      })
      .then(() => redis.xadd('stream', '*', 'key', 'val'))
      .then(id => {
        expect(id).toBe(`${fixedTimestamp}-1`)
        expect(redis.data.get('stream')).toEqual([
          [`${fixedTimestamp}-0`, ['key', 'val']],
          [`${fixedTimestamp}-1`, ['key', 'val']],
        ])
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        })
      })
      .then(() =>
        redis.xadd(
          'stream',
          'MAXLEN',
          '=',
          '2',
          '*',
          'reading',
          '{"key": "value"}'
        )
      )
      .then(id => {
        expect(id).toBe(`${fixedTimestamp}-2`)
        expect(redis.data.get('stream')).toEqual([
          [`${fixedTimestamp}-1`, ['key', 'val']],
          [`${fixedTimestamp}-2`, ['reading', '{"key": "value"}']],
        ])
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        })
        // Advancing the time will reset the counter to 0
        jest.advanceTimersByTime(1)
      })
      .then(() => redis.xadd('stream', '*', 'key', 'val'))
      .then(id => {
        expect(id).toBe(`${fixedTimestamp + 1}-0`)
        expect(redis.data.get('stream')).toEqual([
          [`${fixedTimestamp}-1`, ['key', 'val']],
          [`${fixedTimestamp}-2`, ['reading', '{"key": "value"}']],
          [`${fixedTimestamp + 1}-0`, ['key', 'val']],
        ])
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        })
      })
  })

  it('should throw with an illegal amount of arguments', () => {
    return Promise.all([
      redis.xadd().catch(err => err.message),
      redis.xadd('stream').catch(err => err.message),
      redis.xadd('stream', '*').catch(err => err.message),
      redis.xadd('stream', '*', 'one').catch(err => err.message),
    ]).then(errors =>
      errors.forEach(err =>
        expect(err).toBe("ERR wrong number of arguments for 'xadd' command")
      )
    )
  })

  it('should throw with a duplicate id', () => {
    redis
      .xadd('stream', '*', 'key', 'value')
      .then(id => redis.xadd('stream', id, 'key', 'value'))
      .catch(err =>
        expect(err.message).toBe(
          'ERR The ID specified in XADD is equal or smaller than the target stream top item'
        )
      )
  })

  it('should throw when adding a smaller id', () => {
    redis
      .xadd('stream', '0-2', 'key', 'value')
      .then(() => redis.xadd('stream', '0-1', 'key', 'value'))
      .catch(err =>
        expect(err.message).toBe(
          'ERR The ID specified in XADD is equal or smaller than the target stream top item'
        )
      )
  })
})
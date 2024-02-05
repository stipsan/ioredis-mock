import Redis from 'ioredis'

describe('xread', () => {
  const redis = new Redis()
  if (!process.env.IS_E2E) jest.useFakeTimers({
    doNotFake: ['setTimeout', 'performance'],
  })
  const fixedTimestamp = Date.now()

  afterAll(() => {
    redis.disconnect()
    if (!process.env.IS_E2E) jest.useRealTimers()
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'reads a number of events since an id',
    () => {
      const redis = new Redis({
        data: {
          stream: [
            [`${fixedTimestamp}-0`, ['key', 'val']],
            [`${fixedTimestamp}-1`, ['key', 'val']],
            [`${fixedTimestamp}-2`, ['key', 'val']],
            [`${fixedTimestamp}-3`, ['key', 'val']],
          ],
          [`stream:stream:${fixedTimestamp}-0`]: {
            polled: false,
          },
          [`stream:stream:${fixedTimestamp}-1`]: {
            polled: false,
          },
          [`stream:stream:${fixedTimestamp}-2`]: {
            polled: false,
          },
          [`stream:stream:${fixedTimestamp}-3`]: {
            polled: false,
          },
        },
      })
      return redis
        .xread('COUNT', '2', 'STREAMS', 'stream', `${fixedTimestamp}-1`)
        .then(events =>
          expect(events).toEqual([
            [
              'stream',
              [
                [`${fixedTimestamp}-1`, ['key', 'val']],
                [`${fixedTimestamp}-2`, ['key', 'val']],
              ],
            ],
          ])
        )
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should read from multiple streams',
    () => {
      const redis = new Redis({
        data: {
          stream: [
            ['1-0', ['key', 'val']],
            ['2-0', ['key', 'val']],
            ['3-0', ['key', 'val']],
          ],
          'other-stream': [['1-0', ['key', 'val']]],
          'stream:stream:1-0': {
            polled: false,
          },
          'stream:stream:2-0': {
            polled: false,
          },
          'stream:stream:3-0': {
            polled: false,
          },
          'stream:other-stream:1-0': {
            polled: false,
          },
        },
      })
      return redis
        .xread('COUNT', '2', 'STREAMS', 'stream', 'other-stream', '1-0', '1-0')
        .then(events =>
          expect(events).toEqual([
            [
              'stream',
              [
                ['1-0', ['key', 'val']],
                ['2-0', ['key', 'val']],
              ],
            ],
            ['other-stream', [['1-0', ['key', 'val']]]],
          ])
        )
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should read from multiple streams with incomplete ids',
    () => {
      const redis = new Redis({
        data: {
          stream: [
            ['1-0', ['key', 'val']],
            ['2-0', ['key', 'val']],
            ['3-0', ['key', 'val']],
          ],
          'other-stream': [['1-0', ['key', 'val']]],
          'stream:stream:1-0': {
            polled: false,
          },
          'stream:stream:2-0': {
            polled: false,
          },
          'stream:stream:3-0': {
            polled: false,
          },
          'stream:other-stream:1-0': {
            polled: false,
          },
        },
      })
      return redis
        .xread('COUNT', '2', 'STREAMS', 'stream', 'other-stream', '1', '1')
        .then(events =>
          expect(events).toEqual([
            [
              'stream',
              [
                ['1-0', ['key', 'val']],
                ['2-0', ['key', 'val']],
              ],
            ],
            ['other-stream', [['1-0', ['key', 'val']]]],
          ])
        )
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should block reads till data becomes available',
    () => {
      const op = redis
        .xread('BLOCK', '0', 'STREAMS', 'stream', '$')
        .then(row => {
          const [[stream, [[id, values]]]] = row
          expect(stream).toBe('stream')
          expect(id).toBe(`${fixedTimestamp}-0`)
          expect(values).toEqual(['key', 'val'])
        })
      return redis.xadd('stream', '*', 'key', 'val').then(() => op)
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should block reads till data becomes available since an id',
    () => {
      const op = redis
        .xread('BLOCK', '0', 'STREAMS', 'stream', `${fixedTimestamp}-1`)
        .then(row => {
          const [[stream, [[id, values]]]] = row
          expect(stream).toBe('stream')
          expect(id).toBe(`${fixedTimestamp}-1`)
          expect(values).toEqual(['key', 'val'])
        })
      return redis
        .xadd('stream', '*', 'key', 'val')
        .then(() => redis.xadd('stream', '*', 'key', 'val'))
        .then(() => op)
    }
  )

  it('should block reads on a stream with a time out', () => {
    const before = performance.now()
    return redis
      .xread('BLOCK', '500', 'STREAMS', 'empty-stream', '$')
      .then(row => {
        const after = performance.now()
        expect(after - before >= 500).toBe(true)
        expect(row).toBe(null)
      })
  })

  it('should block reads on multiple streams with a time out', () => {
    const before = performance.now()
    return redis
      .xread(
        'BLOCK',
        '500',
        'STREAMS',
        'empty-stream',
        'empty-stream-2',
        '$',
        '$'
      )
      .then(row => {
        const after = performance.now()
        expect(after - before >= 500).toBe(true)
        expect(row).toBe(null)
      })
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should block until data is provided and return',
    () => {
      const redis = new Redis()
      const before = performance.now()

      setTimeout(() => {
        return redis.xadd('empty-stream-2', '*', 'key', 'val')
      }, 100)

      return redis
        .xread(
          'BLOCK',
          '500',
          'STREAMS',
          'empty-stream',
          'empty-stream-2',
          '$',
          '$'
        )
        .then(row => {
          const after = performance.now()
          expect(after - before >= 100).toBe(true)
          expect(row).toEqual([
            ['empty-stream-2', [[`${fixedTimestamp}-0`, ['key', 'val']]]],
            ['empty-stream', []],
          ])
        })
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should poll all events since ID if no COUNT is given',
    () => {
      const redis = new Redis({
        data: {
          stream: [
            ['1-0', ['key', 'val']],
            ['2-0', ['key', 'val']],
            ['3-0', ['key', 'val']],
          ],
          'stream:stream:1-0': {
            polled: false,
          },
          'stream:stream:2-0': {
            polled: false,
          },
          'stream:stream:3-0': {
            polled: false,
          },
        },
      })
      return redis.xread('STREAMS', 'stream', '2-0').then(events =>
        expect(events).toEqual([
          [
            'stream',
            [
              ['2-0', ['key', 'val']],
              ['3-0', ['key', 'val']],
            ],
          ],
        ])
      )
    }
  )

  it('throws if the operation is neither BLOCK or COUNT', () => {
    return redis
      .xread('INVALID', '2', 'STREAMS', 'stream', '$')
      .catch(err => expect(err.message).toBe('ERR syntax error'))
  })

  it('throws and error on unabalanced stream/id list', () => {
    return redis
      .xread('BLOCK', '0', 'STREAMS', 'stream', 'other-stream', '$')
      .catch(err =>
        expect(err.message).toBe(
          "ERR Unbalanced 'xread' list of streams: for each stream key an ID or '$' must be specified."
        )
      )
  })
})

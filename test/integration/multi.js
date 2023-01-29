import Redis from 'ioredis'

describe('multi', () => {
  it('should setup a batch queue that can be passed to exec', () => {
    const redis = new Redis()

    redis.multi([
      ['incr', 'user_next'],
      ['incr', 'post_next'],
    ])
    expect(typeof redis.batch).toBe('object')
    expect(redis.batch.batch).toEqual(expect.any(Array))
    expect(redis.batch.batch.length).toBe(2)
    expect(redis.batch.batch[0]).toEqual(expect.any(Function))
    expect(redis.batch.batch[1]).toEqual(expect.any(Function))
  })

  it('should map batch length to length in pipeline',() => {
    const redis = new Redis()
    const pipeline = redis.pipeline()

    pipeline
      .incr('user_next')
      .incr('post_next');

    expect(pipeline.length).toBe(2);
  })

  it('allows for pipelining methods', () => {
    const redis = new Redis()

    return redis
      .pipeline()
      .incr('user_next')
      .incr('post_next')
      .exec()
      .then(results => {
        expect(results).toEqual(expect.any(Array))
        expect(results.length).toBe(2)
        expect(results[0]).toEqual([null, 1])
        expect(results[1]).toEqual([null, 1])
      })
  })

  it('allows callbacks on any sequence of the pipeline', () => {
    const redis = new Redis()
    let internalCallsCounter = 0

    return redis
      .pipeline()
      .incr('user_next', (err, reply) => {
        expect(err).toEqual(null)
        expect(reply).toEqual(1)
        internalCallsCounter += 1
      })
      .incr('bar_next')
      .incr('post_next', (err, reply) => {
        expect(err).toEqual(null)
        expect(reply).toEqual(1)
        internalCallsCounter += 1
      })
      .incr('foo_next')
      .exec()
      .then(results => {
        expect(results).toEqual(expect.any(Array))
        expect(results.length).toBe(4)
        expect(internalCallsCounter).toEqual(2)
      })
  })

  it('allows pipeline to accept an array of String commands', () => {
    const redis = new Redis()
    const commands = [
      ['set', 'firstkey', 'firstvalue'],
      ['set', 'secondkey', 'secondvalue'],
    ]

    return redis
      .pipeline(commands)
      .exec()
      .then(results => {
        expect(results).toEqual(expect.any(Array))
        expect(results.length).toBe(2)
        expect(results[0]).toEqual([null, 'OK'])
        expect(results[1]).toEqual([null, 'OK'])

        expect(redis.data.get('firstkey')).toEqual('firstvalue')
        expect(redis.data.get('secondkey')).toEqual('secondvalue')
      })
  })

  it('should increment _transactions', () => {
    const redis = new Redis()
    const commands = [
      ['incr', 'user_next'],
      ['incr', 'post_next'],
    ]
    redis.multi(commands)
    // eslint-disable-next-line no-underscore-dangle
    expect(redis.batch._transactions).toEqual(commands.length + 1)
  })

  it('errors if you exec without starting a pipeline', () => {
    const redis = new Redis()

    return redis.exec().catch(err => {
      expect(err).toBeInstanceOf(Error)
    })
  })
})

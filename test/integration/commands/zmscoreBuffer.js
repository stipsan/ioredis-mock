import Redis from 'ioredis'

describe('zmscoreBuffer', () => {
  const redis = new Redis()
  afterAll(() => {
    redis.disconnect()
  })
  beforeEach(async () => {
    await redis.zadd(
      'foo',
      1,
      'first',
      2,
      'second',
      3,
      'third',
      4,
      'fourth',
      5,
      'fifth'
    )
    await redis.set('bar', 'not a sorted set')
  })

  it('should return the score of an existing member as a Buffer', () => {
    return redis.zmscoreBuffer('foo', 'third').then(res => expect(res).toEqual([Buffer.from('3')]))
  })

  it('should return the scores of existing members as Buffers', () => {
    return redis
      .zmscoreBuffer('foo', 'third', 'fourth', 'fifth')
      .then(res => expect(res).toEqual([Buffer.from('3'), Buffer.from('4'), Buffer.from('5')]))
  })

  it('should return null when the member does not exist', () => {
    return redis
      .zmscoreBuffer('foo', 'sixth')
      .then(res => expect(res).toEqual([null]))
  })

  it('should return null in place of any members that are not in the set', () => {
    return redis
      .zmscoreBuffer('foo', 'fifth', 'sixth', 'seventh')
      .then(res => expect(res).toEqual([Buffer.from('5'), null, null]))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return null when the key is not a sorted set',
    () => {
      return redis
        .zmscoreBuffer('bar', 'first')
        .then(res => expect(res).toEqual([null]))
    }
  )
  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return nulls for all members when the key is not a sorted set',
    () => {
      return redis
        .zmscoreBuffer('bar', 'first', 'second', 'third')
        .then(res => expect(res).toEqual([null, null, null]))
    }
  )

  it('should return null when the key does not exist', () => {
    return redis
      .zmscoreBuffer('baz', 'first')
      .then(res => expect(res).toEqual([null]))
  })
  it('should return nulls for all members when the key does not exist', () => {
    return redis
      .zmscoreBuffer('baz', 'first', 'second', 'third')
      .then(res => expect(res).toEqual([null, null, null]))
  })
})
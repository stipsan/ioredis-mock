import Redis from 'ioredis'

describe('zpopmin', () => {
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
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return first item with score',
    () => {
      return redis.zpopmin('foo').then(res => expect(res).toEqual(['first', 1]))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return first N item with score if count=N',
    () => {
      return redis
        .zpopmin('foo', 3)
        .then(res => expect(res).toEqual(['first', 1, 'second', 2, 'third', 3]))
    }
  )

  it('should return empty list if no data', () => {
    return redis.zpopmin('bar').then(res => expect(res).toEqual([]))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should remove the items', () => {
    return redis.zpopmin('foo', 2).then(() => {
      expect(redis.data.get('foo').has('first')).toBe(false)
      expect(redis.data.get('foo').has('second')).toBe(false)
      expect(redis.data.get('foo').has('third')).toBe(true)
    })
  })
})

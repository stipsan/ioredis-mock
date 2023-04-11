import Redis from 'ioredis'

describe('zpopmax', () => {
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
      return redis.zpopmax('foo').then(res => expect(res).toEqual(['fifth', 5]))
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return first N item with score if count=N',
    () => {
      return redis
        .zpopmax('foo', 3)
        .then(res => expect(res).toEqual(['fifth', 5, 'fourth', 4, 'third', 3]))
    }
  )

  it('should return empty list if no data', () => {
    return redis.zpopmax('bar').then(res => expect(res).toEqual([]))
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should remove the items', () => {
    return redis.zpopmax('foo', 2).then(() => {
      expect(redis.data.get('foo').has('fifth')).toBe(false)
      expect(redis.data.get('foo').has('fourth')).toBe(false)
      expect(redis.data.get('foo').has('third')).toBe(true)
    })
  })
})

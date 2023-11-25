import Redis from 'ioredis'

describe('zmpop', () => {
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
      'fifth',
    )
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return first two items with max score',
    async () => {
      const res = await redis.zmpop(2, 'foo', 'bar', 'MAX', 'COUNT', 2)
      expect(res).toEqual(['foo', [['fifth', 5], ['fourth', 4]]])
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return first two items with min score',
    async () => {
      const res = await redis.zmpop(2, 'foo', 'bar', 'MIN', 'COUNT', 2)
      expect(res).toEqual(['foo', [['first', 1], ['second', 2]]])
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return first N item with max score if count=N',
    async () => {
      const res = await redis.zmpop(2, 'foo', 'bar', 'MAX', 'COUNT', 3)
      expect(res).toEqual(['foo', [['fifth', 5], ['fourth', 4], ['third', 3]]])
    }
  )

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should return first N item with min score if count=N',
    async () => {
      const res = await redis.zmpop(2, 'foo', 'bar', 'MIN', 'COUNT', 3)
      expect(res).toEqual(['foo', [['first', 1], ['second', 2], ['third', 3]]])
    }
  )

  it('should return null if no data', async () => {
    const res = await redis.zmpop(1, 'foobar', 'MAX')
    expect(res).toEqual(null)
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should remove the items', async () => {
    await redis.zmpop(2, 'foo', 'bar', 'MAX', 'COUNT', 2)
    expect(redis.data.get('foo').has('fifth')).toBe(false)
    expect(redis.data.get('foo').has('fourth')).toBe(false)
    expect(redis.data.get('foo').has('third')).toBe(true)
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)('should return items from the second key if the second is empty', async () => {
    const res = await redis.zmpop(2, 'bar', 'foo', 'MIN', 'COUNT', 3)
    expect(res).toEqual(['foo', [['first', 1], ['second', 2], ['third', 3]]])
  })
})

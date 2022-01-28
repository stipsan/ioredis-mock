import Redis from 'ioredis'

describe('smismember', () => {
  it('should check if each item exists in set', async () => {
    const valuesInTheSet = ['foo', 'bar']
    const redis = new Redis({
      data: {
        setKey: new Set(valuesInTheSet),
      },
    })

    // should take n number of values after the key
    const result = await redis.smismember('setKey', ...valuesInTheSet)
    expect(result).toEqual(expect.arrayContaining([1, 1]))

    // should take a single value as well but return an array
    const result2 = await redis.smismember('foos', 'foobar')
    expect(result2).toEqual(expect.arrayContaining([0]))

    // should return 0 if a value is not included in the set
    const result3 = await redis.smismember(
      'setKey',
      ...['foobar', ...valuesInTheSet]
    )
    expect(result3).toEqual(expect.arrayContaining([0, 1, 1]))
  })
})

import Redis from 'ioredis'

describe('time', () => {
  it('should return an array with current time in seconds and microseconds', async () => {
    const redis = new Redis()

    const result = await redis.time()
    expect(result[0]).toEqual(expect.any(String))
    expect(result[1]).toEqual(expect.any(String))
    expect(parseInt(result[0], 10)).toEqual(expect.any(Number))
    expect(parseInt(result[1], 10)).toEqual(expect.any(Number))
    expect(Number.isNaN(parseInt(result[0], 10))).toBe(false)
    expect(Number.isNaN(parseInt(result[1], 10))).toBe(false)

    redis.disconnect()
  })
})

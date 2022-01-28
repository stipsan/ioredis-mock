import Redis from 'ioredis'

describe('info', () => {
  it('should return default info with CRLF', async () => {
    const redis = new Redis()
    const value = await redis.info()
    const lines = value.split('\r\n')

    expect(lines).toHaveLength(value.split('\n').length)
    expect(
      lines.some(line => {
        return line.startsWith('redis_version:')
      })
    ).toBeTruthy()
    redis.disconnect()
  })
})

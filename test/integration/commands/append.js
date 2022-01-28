import Redis from 'ioredis'

describe('append', () => {
  it('should append to exiting string and return new length', async () => {
    const redis = new Redis()
    await redis.set('mykey', 'Hello')

    expect(await redis
      .append('mykey', ' World')).toBe(11)
      expect(await redis.get('mykey')).toBe('Hello World')
    redis.disconnect()
  })
  it('should set empty string if key does not exist', async () => {
    const redis = new Redis()

    expect(await redis
      .append('mykey', ' World')).toBe(6)
      expect(await redis.get('mykey')).toBe(' World')
    redis.disconnect()
  })
  it('should append to exiting buffer and return new length', async () => {
    const redis = new Redis()
    await redis.set('mykey', Buffer.from('Hello'))

    expect(await redis
      .append('mykey', Buffer.from(' World'))).toBe(11)
      expect(await redis.getBuffer('mykey')).toEqual(
        Buffer.from('Hello World')
      )
    redis.disconnect()
  })
  it('should set empty buffer if key does not exist', async () => {
    const redis = new Redis()
    const buffer = Buffer.from('Hello World')

    expect(await redis
      .append('mykey', buffer)).toBe(buffer.length)
      expect(await redis.getBuffer('mykey')).toEqual(buffer)
    redis.disconnect()
  })
})

import Redis from 'ioredis'

describe('type', () => {
  const redis = new Redis()

  afterAll(() => {
    redis.disconnect()
  })

  test('should return none when key does not exist', async () => {
    expect(await redis.type('nope')).toBe('none')
  })

  test('should return string', async () => {
    await redis.set('mystring', 'foo')

    expect(await redis.type('mystring')).toBe('string')
  })

  test('should return list', async () => {
    await redis.lpush('mylist', 'foo')

    expect(await redis.type('mylist')).toBe('list')
  })

  test('should return set', async () => {
    await redis.sadd('myset', 'foo')

    expect(await redis.type('myset')).toBe('set')
  })

  test('should return hash', async () => {
    await redis.hset('myhash', 'foo', 'bar')

    expect(await redis.type('myhash')).toBe('hash')
  })

  test.todo('should return zset')
})

import Redis from 'ioredis'

describe('Expired keys enumeration', () => {
  it('should exclude expired keys from DBSIZE', async () => {
    const redis = new Redis()

    // Set keys with expiry
    await redis.setex('expiring1', 1, 'value1')
    await redis.setex('expiring2', 1, 'value2')
    await redis.set('normal', 'value')

    // Before expiry, dbsize should be 3
    expect(await redis.dbsize()).toBe(3)

    // Wait for expiry
    await new Promise(resolve => setTimeout(resolve, 1100))

    // After expiry, dbsize should be 1
    expect(await redis.dbsize()).toBe(1)

    redis.disconnect()
  })

  it('should exclude expired keys from RANDOMKEY', async () => {
    const redis = new Redis()

    // Set only one key with expiry
    await redis.setex('only-key', 1, 'value')

    // Before expiry, randomkey should return the key
    const keyBefore = await redis.randomkey()
    expect(keyBefore).toBe('only-key')

    // Wait for expiry
    await new Promise(resolve => setTimeout(resolve, 1100))

    // After expiry, randomkey should return null
    const keyAfter = await redis.randomkey()
    expect(keyAfter).toBe(null)

    redis.disconnect()
  })

  it('should exclude expired keys from SCAN', async () => {
    const redis = new Redis()

    // Set keys with expiry
    await redis.setex('expiring', 1, 'value')
    await redis.set('normal', 'value')

    // Before expiry, scan should return both keys
    const [, keysBefore] = await redis.scan(0)
    expect(keysBefore.sort()).toEqual(['expiring', 'normal'])

    // Wait for expiry
    await new Promise(resolve => setTimeout(resolve, 1100))

    // After expiry, scan should return only normal key
    const [, keysAfter] = await redis.scan(0)
    expect(keysAfter).toEqual(['normal'])

    redis.disconnect()
  })

  it('should handle multiple expired keys consistently', async () => {
    const redis = new Redis()

    // Set multiple keys with different expiry times
    await redis.setex('expires-soon', 1, 'value1')
    await redis.setex('expires-later', 2, 'value2')
    await redis.set('never-expires', 'value3')

    // Initially all keys should be present
    expect(await redis.keys('*')).toHaveLength(3)
    expect(await redis.dbsize()).toBe(3)

    // After first expiry
    await new Promise(resolve => setTimeout(resolve, 1100))
    expect(await redis.keys('*')).toHaveLength(2)
    expect(await redis.dbsize()).toBe(2)
    
    // Verify specific keys
    const keysAfterFirst = (await redis.keys('*')).sort()
    expect(keysAfterFirst).toEqual(['expires-later', 'never-expires'])

    // After second expiry
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(await redis.keys('*')).toHaveLength(1)
    expect(await redis.dbsize()).toBe(1)
    expect(await redis.keys('*')).toEqual(['never-expires'])

    redis.disconnect()
  })
})
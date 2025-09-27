import Redis from 'ioredis'

describe('Debug redis.call array', () => {
  it('should compare hardcoded array vs redis.call array', async () => {
    const redis = new Redis()
    
    // Set up some data
    await redis.lpush('list', 'c', 'b', 'a')
    
    // Test 1: Hardcoded array (works)
    const hardcodedScript = `
      return {'a', 'b', 'c'}
    `
    const def1 = { numberOfKeys: 0, lua: hardcodedScript }
    await redis.defineCommand('hardcodedArray', def1)
    
    const hardcodedResult = await redis.hardcodedArray()
    console.log('Hardcoded - type:', typeof hardcodedResult, 'isArray:', Array.isArray(hardcodedResult))
    console.log('Hardcoded - result:', hardcodedResult)
    
    // Test 2: Redis call array (fails)
    const redisCallScript = `
      return redis.call('LRANGE', 'list', 0, -1)
    `
    const def2 = { numberOfKeys: 0, lua: redisCallScript }
    await redis.defineCommand('redisCallArray', def2)
    
    try {
      const redisCallResult = await redis.redisCallArray()
      console.log('Redis call - type:', typeof redisCallResult, 'isArray:', Array.isArray(redisCallResult))
      console.log('Redis call - result:', redisCallResult)
      
      if (typeof redisCallResult === 'function') {
        console.log('Redis call - properties:', Object.getOwnPropertyNames(redisCallResult))
        console.log('Redis call - get method exists:', typeof redisCallResult.get)
        if (typeof redisCallResult.get === 'function') {
          console.log('Redis call - get(1):', redisCallResult.get(1))
          console.log('Redis call - get(2):', redisCallResult.get(2))
        }
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
    
    redis.disconnect()
  })
})
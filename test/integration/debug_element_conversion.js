import Redis from 'ioredis'

describe('Debug element conversion', () => {
  it('should check individual elements from redis.call', async () => {
    const redis = new Redis()
    
    await redis.lpush('list', 'c', 'b', 'a')
    
    // Test individual elements
    const elementScript = `
      local arr = redis.call('LRANGE', 'list', 0, -1)
      return {
        type(arr),          -- Should be 'table'
        type(arr[1]),       -- Should be 'string'  
        arr[1],             -- Should be 'a'
        arr[2],             -- Should be 'b'
        arr[3]              -- Should be 'c'
      }
    `
    const def = { numberOfKeys: 0, lua: elementScript }
    await redis.defineCommand('checkElements', def)
    
    const result = await redis.checkElements()
    console.log('Element check result:', result)
    console.log('Types:', result.map(r => typeof r))
    console.log('Values:', result)
    
    redis.disconnect()
  })
})
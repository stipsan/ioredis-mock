import Redis from 'ioredis'

describe('Debug isTopArray behavior', () => {
  it('should check isTopArray for different table types', async () => {
    const redis = new Redis()
    
    await redis.lpush('list', 'c', 'b', 'a')
    
    // Add debug logging to check isTopArray behavior
    const debugScript = `
      -- Native Lua table
      local native = {'x', 'y', 'z'}
      
      -- Redis call table  
      local fromRedis = redis.call('LRANGE', 'list', 0, -1)
      
      -- Manual reconstruction from redis call
      local manual = {fromRedis[1], fromRedis[2], fromRedis[3]}
      
      return {
        -- Return info about each table
        {type(native), #native, native[1]},
        {type(fromRedis), #fromRedis, fromRedis[1]}, 
        {type(manual), #manual, manual[1]}
      }
    `
    const def = { numberOfKeys: 0, lua: debugScript }
    await redis.defineCommand('debugTypes', def)
    
    const result = await redis.debugTypes()
    console.log('Native table info:', result[0])
    console.log('Redis table info:', result[1])
    console.log('Manual table info:', result[2])
    
    redis.disconnect()
  })
})
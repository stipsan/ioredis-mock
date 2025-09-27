import Redis from 'ioredis'

describe('Debug Lua table conversion', () => {
  it('should show what type of object redis.call returns', async () => {
    const redis = new Redis()
    
    await redis.zadd('test', 1, 'a', 2, 'b')
    
    // Test with the old implementation by reverting locally for debugging
    const luaCode = `
      local result = redis.call('zrange', 'test', 0, -1)
      return result
    `
    
    const definition = { numberOfKeys: 0, lua: luaCode }
    await redis.defineCommand('debugCmd', definition)
    
    const result = await redis.debugCmd()
    console.log('Result type:', typeof result)
    console.log('Result constructor:', result.constructor.name)
    console.log('Result is array:', Array.isArray(result))
    console.log('Result:', result)
    
    // Try accessing as function to see if it's a js_proxy
    if (typeof result === 'function') {
      console.log('Result as function:', result.toString())
    }
    
    redis.disconnect()
  })
})
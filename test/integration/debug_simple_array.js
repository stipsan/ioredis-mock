import Redis from 'ioredis'

describe('Simple array return test', () => {
  it('should be able to return a simple hardcoded JavaScript array', async () => {
    const redis = new Redis()
    
    // Simple script that returns a hardcoded Lua table
    const luaScript = `
      return {'a', 'b', 'c'}
    `
    
    const definition = { numberOfKeys: 0, lua: luaScript }
    await redis.defineCommand('simpleArray', definition)
    
    const result = await redis.simpleArray()
    console.log('Simple array result type:', typeof result)
    console.log('Simple array result:', result)
    console.log('Is array:', Array.isArray(result))
    
    redis.disconnect()
  })
})
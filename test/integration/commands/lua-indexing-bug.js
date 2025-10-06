import Redis from 'ioredis'

describe('Lua array indexing bug reproduction', () => {
  it('should use 1-based indexing for array results from redis.call', async () => {
    const redis = new Redis()
    
    // Set up test data
    await redis.zadd('mykey', 1, 'first', 2, 'second', 3, 'third')
    
    // Test script that checks both 0-based and 1-based indexing
    const luaScript = `
      local result = redis.call('ZRANGE', 'mykey', 0, -1)
      
      -- This should be the proper way (1-based indexing)
      local first_element_1based = result[1]  
      local second_element_1based = result[2]
      local third_element_1based = result[3]
      
      -- This should return nil (0-based indexing shouldn't work)
      local first_element_0based_is_nil = (result[0] == nil)
      
      -- Return a table with all the test results
      return {
        first_element_1based,
        second_element_1based, 
        third_element_1based,
        first_element_0based_is_nil
      }
    `
    
    const luaResult = await redis.eval(luaScript, 0)
    
    // Check the structure
    expect(luaResult).toHaveLength(4)
    expect(luaResult[0]).toEqual('first')   // result[1] should be 'first'
    expect(luaResult[1]).toEqual('second')  // result[2] should be 'second' 
    expect(luaResult[2]).toEqual('third')   // result[3] should be 'third'
    expect(luaResult[3]).toEqual(true)      // result[0] should be nil
    
    redis.disconnect()
  })
  
  it('should demonstrate the problem with zero-based indexing', async () => {
    const redis = new Redis()
    
    // Set up test data
    await redis.zadd('mykey', 1, 'first', 2, 'second', 3, 'third')
    
    // This test is to show what would happen if the bug exists
    // If arrays returned by redis.call use 0-based indexing, this would fail
    const luaScript = `
      local result = redis.call('ZRANGE', 'mykey', 0, -1)
      
      -- In proper Lua, this should work (1-based)
      if result[1] ~= 'first' then
        error('Expected result[1] to be first, got: ' .. tostring(result[1]))
      end
      
      if result[2] ~= 'second' then
        error('Expected result[2] to be second, got: ' .. tostring(result[2]))
      end
      
      if result[3] ~= 'third' then
        error('Expected result[3] to be third, got: ' .. tostring(result[3]))
      end
      
      -- result[0] should be nil in proper Lua
      if result[0] ~= nil then
        error('Expected result[0] to be nil, got: ' .. tostring(result[0]))
      end
      
      return 'OK'
    `
    
    const luaResult = await redis.eval(luaScript, 0)
    expect(luaResult).toEqual('OK')
    
    redis.disconnect()
  })
  
  it('should debug the array issue step by step', async () => {
    const redis = new Redis()
    
    // Set up test data
    await redis.zadd('mykey', 1, 'first', 2, 'second', 3, 'third')
    
    // Test 1: Hardcoded array should work correctly
    const hardcodedScript = `
      local arr = {'a', 'b', 'c'}
      return {arr[1], arr[2], arr[3]}
    `
    const hardcodedResult = await redis.eval(hardcodedScript, 0)
    expect(hardcodedResult).toEqual(['a', 'b', 'c'])
    
    // Test 2: Check what happens with redis.call result
    const redisCallScript = `
      local result = redis.call('ZRANGE', 'mykey', 0, -1)
      -- Let's return some debug info about the result
      return {
        type(result),
        result[1],  -- This should be 'first' if 1-based
        result[0] == nil,  -- This should be true if 1-based  
        #result     -- Length should be 3
      }
    `
    
    const debugResult = await redis.eval(redisCallScript, 0)
    
    // Based on correct Lua behavior:
    expect(debugResult[0]).toEqual('table')        // Should be a table
    expect(debugResult[1]).toEqual('first')        // result[1] should be 'first'
    expect(debugResult[2]).toEqual(true)           // result[0] should be nil (so this should be true)
    expect(debugResult[3]).toEqual(3)              // Length should be 3
    
    redis.disconnect()
  })
})
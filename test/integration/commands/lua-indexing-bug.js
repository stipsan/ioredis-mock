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
      local first_element_0based = result[0]
      
      -- Return a table with all the test results
      return {
        result,  -- The original result
        first_element_1based,
        second_element_1based, 
        third_element_1based,
        first_element_0based
      }
    `
    
    const luaResult = await redis.eval(luaScript, 0)
    
    // Check the structure
    expect(luaResult).toHaveLength(5)
    expect(luaResult[0]).toEqual(['first', 'second', 'third'])  // original result
    expect(luaResult[1]).toEqual('first')   // result[1] should be 'first'
    expect(luaResult[2]).toEqual('second')  // result[2] should be 'second' 
    expect(luaResult[3]).toEqual('third')   // result[3] should be 'third'
    expect(luaResult[4]).toEqual(false)     // result[0] should be nil/false
    
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
  
  it('should work correctly with different commands that return arrays', async () => {
    const redis = new Redis()
    
    // Test with different array-returning commands
    await redis.lpush('list', 'three', 'two', 'one')
    await redis.sadd('set', 'a', 'b', 'c')
    
    const luaScript = `
      local list_result = redis.call('LRANGE', 'list', 0, -1)
      local set_result = redis.call('SMEMBERS', 'set')
      
      return {
        list_result[1], -- Should be 'one'
        #list_result,   -- Should be 3
        #set_result     -- Should be 3
      }
    `
    
    const luaResult = await redis.eval(luaScript, 0)
    expect(luaResult[0]).toEqual('one')  // first element of list
    expect(luaResult[1]).toEqual(3)      // length of list
    expect(luaResult[2]).toEqual(3)      // length of set
    
    redis.disconnect()
  })
})
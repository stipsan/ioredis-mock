#!/usr/bin/env node

// Test script to reproduce the Lua array indexing issue
const Redis = require('./src/index');

async function testLuaArrayIndexing() {
  const redis = new Redis();
  
  // Set up test data
  await redis.zadd('mykey', 1, 'first', 2, 'second', 3, 'third');
  
  console.log('=== Direct ZRANGE call ===');
  const directResult = await redis.zrange('mykey', 0, -1);
  console.log('Direct result:', directResult);
  console.log('Direct result length:', directResult.length);
  
  console.log('\n=== ZRANGE via Lua script ===');
  const luaScript = `
    local result = redis.call('ZRANGE', KEYS[1], 0, -1)
    redis.call('DEBUG', 'Lua result type:', type(result))
    redis.call('DEBUG', 'Lua result length:', #result)
    
    -- Test 1-based indexing (Lua standard)
    redis.call('DEBUG', 'result[1]:', result[1])
    redis.call('DEBUG', 'result[2]:', result[2])
    redis.call('DEBUG', 'result[3]:', result[3])
    
    -- Test 0-based indexing (if bug exists)
    redis.call('DEBUG', 'result[0]:', result[0])
    
    return result
  `;
  
  try {
    const luaResult = await redis.eval(luaScript, 1, 'mykey');
    console.log('Lua result:', luaResult);
    console.log('Lua result length:', luaResult.length);
    
    console.log('\n=== Comparison ===');
    console.log('Results are equal:', JSON.stringify(directResult) === JSON.stringify(luaResult));
    
    // Additional test - let's manually check indexing in Lua
    const indexTestScript = `
      local result = redis.call('ZRANGE', KEYS[1], 0, -1)
      local formatted = {}
      
      -- Show what we get at each index
      for i = 0, 5 do
        if result[i] ~= nil then
          table.insert(formatted, 'index[' .. i .. ']=' .. tostring(result[i]))
        end
      end
      
      for i = 1, 5 do
        if result[i] ~= nil then
          table.insert(formatted, 'index[' .. i .. ']=' .. tostring(result[i]))
        end
      end
      
      return formatted
    `;
    
    console.log('\n=== Index test ===');
    const indexResult = await redis.eval(indexTestScript, 1, 'mykey');
    console.log('Index test result:', indexResult);
    
  } catch (error) {
    console.error('Error running Lua script:', error);
  }
  
  redis.disconnect();
}

testLuaArrayIndexing().catch(console.error);
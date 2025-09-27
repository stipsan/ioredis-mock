const Redis = require('./lib/index.js')

async function debugArrayIndexing() {
  const redis = new Redis();
  
  // Set up test data
  await redis.zadd('mykey', 1, 'first', 2, 'second', 3, 'third');
  
  // Check direct call first
  console.log('=== Direct ZRANGE ===');
  const directResult = await redis.zrange('mykey', 0, -1);
  console.log('Direct result:', directResult);
  
  // Test a simple Lua script that just returns a hardcoded array
  console.log('\n=== Hardcoded array in Lua ===');
  const hardcodedScript = `
    return {'a', 'b', 'c'}
  `;
  const hardcodedResult = await redis.eval(hardcodedScript, 0);
  console.log('Hardcoded result:', hardcodedResult);
  
  // Test accessing hardcoded array elements
  const hardcodedAccessScript = `
    local arr = {'a', 'b', 'c'}
    return {arr[0], arr[1], arr[2], arr[3]}
  `;
  const hardcodedAccessResult = await redis.eval(hardcodedAccessScript, 0);
  console.log('Hardcoded access [0,1,2,3]:', hardcodedAccessResult);
  
  // Now test with redis.call
  console.log('\n=== ZRANGE via redis.call ===');
  const redisCallScript = `
    local result = redis.call('ZRANGE', 'mykey', 0, -1)
    return {result[0], result[1], result[2], result[3]}
  `;
  
  try {
    const redisCallResult = await redis.eval(redisCallScript, 0);
    console.log('Redis call access [0,1,2,3]:', redisCallResult);
  } catch (error) {
    console.error('Error with redis call script:', error.message);
  }
  
  // Test what type the redis.call result is
  const typeScript = `
    local result = redis.call('ZRANGE', 'mykey', 0, -1)
    return type(result)
  `;
  const typeResult = await redis.eval(typeScript, 0);
  console.log('Type of redis.call result:', typeResult);
  
  redis.disconnect();
}

debugArrayIndexing().catch(console.error);
import Redis from 'ioredis'

describe('Debug table return types', () => {
  it('should compare different ways of creating/returning tables', async () => {
    const redis = new Redis()
    
    await redis.lpush('list', 'c', 'b', 'a')
    
    // Test 1: Manually constructed table
    const manualTableScript = `
      return {'a', 'b', 'c'}
    `
    const def1 = { numberOfKeys: 0, lua: manualTableScript }
    await redis.defineCommand('manualTable', def1)
    const manualResult = await redis.manualTable()
    console.log('Manual table - type:', typeof manualResult, 'isArray:', Array.isArray(manualResult))
    
    // Test 2: Table constructed from redis.call elements
    const constructedTableScript = `
      local arr = redis.call('LRANGE', 'list', 0, -1)
      return {arr[1], arr[2], arr[3]}
    `
    const def2 = { numberOfKeys: 0, lua: constructedTableScript }
    await redis.defineCommand('constructedTable', def2)
    const constructedResult = await redis.constructedTable()
    console.log('Constructed table - type:', typeof constructedResult, 'isArray:', Array.isArray(constructedResult))
    
    // Test 3: Direct return of redis.call result (this is the problematic one)
    const directReturnScript = `
      return redis.call('LRANGE', 'list', 0, -1)
    `
    const def3 = { numberOfKeys: 0, lua: directReturnScript }
    await redis.defineCommand('directReturn', def3)
    const directResult = await redis.directReturn()
    console.log('Direct return - type:', typeof directResult, 'isArray:', Array.isArray(directResult))
    
    redis.disconnect()
  })
})
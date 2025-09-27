import Redis from 'ioredis'

describe('Debug table return issue', () => {
  it('should show what happens when returning tables directly', async () => {
    const redis = new Redis()
    
    await redis.zadd('test', 1, 'a', 2, 'b')
    
    // Simple case that works (accessing element)
    const elementScript = `
      local result = redis.call('ZRANGE', 'test', 0, -1)
      return result[1]  -- Just return first element
    `
    
    const definition1 = { numberOfKeys: 0, lua: elementScript }
    await redis.defineCommand('getElement', definition1)
    const elementResult = await redis.getElement()
    console.log('Element result:', typeof elementResult, elementResult)
    
    // Complex case that fails (returning whole table)
    const tableScript = `
      local result = redis.call('ZRANGE', 'test', 0, -1)
      return result  -- Return whole table
    `
    
    const definition2 = { numberOfKeys: 0, lua: tableScript }
    await redis.defineCommand('getTable', definition2)
    
    try {
      const tableResult = await redis.getTable()
      console.log('Table result type:', typeof tableResult)
      console.log('Table result constructor:', tableResult.constructor.name)
      console.log('Table result is array:', Array.isArray(tableResult))
      if (typeof tableResult === 'function') {
        console.log('Table result keys:', Object.getOwnPropertyNames(tableResult))
        // Try to access it like an array
        console.log('tableResult[0]:', tableResult[0])
        console.log('tableResult[1]:', tableResult[1])
        console.log('tableResult.length:', tableResult.length)
      }
    } catch (error) {
      console.error('Error with table result:', error.message)
    }
    
    redis.disconnect()
  })
})
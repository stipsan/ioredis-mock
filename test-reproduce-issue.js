const Redis = require('./lib/index.js')

async function testZrangebyscoreIssue() {
  const mockIORedis = new Redis()
  
  // Seed 100 items
  const itemsPending = Array(100).fill().map((_, index) => {
    mockIORedis.zadd('myZSet', index, `data_${index}`)
  })
  await Promise.all(itemsPending)
  
  // Get all items with LIMIT 0, -1 (should return all items)
  const items = await mockIORedis.zrangebyscore('myZSet', '-inf', '+inf', 'LIMIT', 0, -1)
  
  console.log('Number of items returned:', items.length)
  console.log('Expected:', 100)
  console.log('Last few items:', items.slice(-5))
  
  // Also test without LIMIT to see if the issue exists there too
  const allItems = await mockIORedis.zrangebyscore('myZSet', '-inf', '+inf')
  console.log('All items without LIMIT:', allItems.length)
  
  return items.length === 100
}

testZrangebyscoreIssue().then(result => {
  console.log('Test passed:', result)
  process.exit(result ? 0 : 1)
})
// Test to verify the issue with expired keys being returned by KEYS command
const Redis = require('./src/index.js')

async function testExpiredKeys() {
  const redis = new Redis()

  console.log('Setting key with expiry...')
  await redis.setex('test', 1, 'test val')
  
  console.log('Getting key immediately:', await redis.get('test'))
  console.log('Keys before expiry:', await redis.keys('*'))
  console.log('DBSIZE before expiry:', await redis.dbsize())
  console.log('RANDOMKEY before expiry:', await redis.randomkey())
  
  console.log('Waiting for expiry...')
  await new Promise(resolve => setTimeout(resolve, 1100))
  
  console.log('Getting key after expiry:', await redis.get('test'))
  console.log('TTL after expiry:', await redis.ttl('test'))
  console.log('Keys after expiry (BUG - should be empty):', await redis.keys('*'))
  console.log('DBSIZE after expiry (BUG - should be 0):', await redis.dbsize())
  console.log('RANDOMKEY after expiry (BUG - should be null):', await redis.randomkey())
  
  // Test scan as well
  const scanResult = await redis.scan(0)
  console.log('SCAN after expiry (BUG - should be empty):', scanResult)
  
  redis.disconnect()
}

testExpiredKeys().catch(console.error)
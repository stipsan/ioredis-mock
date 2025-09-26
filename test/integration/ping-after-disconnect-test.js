import Redis from 'ioredis'

describe('ping after disconnect', () => {
  it('should demonstrate the current behavior', async () => {
    const redis = new Redis()
    
    console.log('Before disconnect - connected:', redis.connected)
    const result1 = await redis.ping()
    console.log('Before disconnect - ping result:', result1)
    
    redis.disconnect()
    console.log('After disconnect - connected:', redis.connected)
    
    try {
      const result2 = await redis.ping()
      console.log('After disconnect - ping result:', result2)
    } catch (e) {
      console.log('After disconnect - ping error:', e.message)
    }
  })
  
  it('should demonstrate behavior with lazyConnect and enableOfflineQueue false', async () => {
    const redis = new Redis({ lazyConnect: true, enableOfflineQueue: false })
    
    console.log('Initially connected:', redis.connected)
    
    try {
      const result = await redis.ping()
      console.log('Ping result when not connected:', result)
    } catch (e) {
      console.log('Ping error when not connected:', e.message)
    }
    
    redis.disconnect()
  })
})
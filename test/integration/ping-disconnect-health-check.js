import Redis from 'ioredis'

describe('ping disconnect health check', () => {
  // Simulate the user's health check implementation
  async function healthCheck(client) {
    try {
      await client.ping()
      return 'UP'
    } catch (_e) {
      return 'DOWN'
    }
  }

  it('should return DOWN after disconnect with default options', async () => {
    const redis = new Redis()
    
    // Health check should work when connected
    expect(await healthCheck(redis)).toBe('UP')
    
    // Disconnect the client
    redis.disconnect()
    
    // Health check should now return DOWN
    expect(await healthCheck(redis)).toBe('DOWN')
  })

  it('should return UP after disconnect when enableOfflineQueue is true', async () => {
    const redis = new Redis({ enableOfflineQueue: true })
    
    // Health check should work when connected
    expect(await healthCheck(redis)).toBe('UP')
    
    // Disconnect the client
    redis.disconnect()
    
    // Health check should still return UP because enableOfflineQueue allows commands
    expect(await healthCheck(redis)).toBe('UP')
  })

  it('should return DOWN when enableOfflineQueue is explicitly false', async () => {
    const redis = new Redis({ enableOfflineQueue: false })
    
    // Health check should work when connected
    expect(await healthCheck(redis)).toBe('UP')
    
    // Disconnect the client
    redis.disconnect()
    
    // Health check should return DOWN
    expect(await healthCheck(redis)).toBe('DOWN')
  })

  it('should return DOWN when created with lazyConnect and not connected', async () => {
    const redis = new Redis({ lazyConnect: true, enableOfflineQueue: false })
    
    // Health check should return DOWN when not connected
    expect(await healthCheck(redis)).toBe('DOWN')
    
    redis.disconnect()
  })
})
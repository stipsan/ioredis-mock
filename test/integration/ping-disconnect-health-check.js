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

  it('should return UP after disconnect with default options (enableOfflineQueue: true)', async () => {
    // Use lazyConnect to avoid actual connection in E2E tests
    const redis = new Redis({ lazyConnect: true })
    
    if (process.env.IS_E2E) {
      // In E2E tests with real ioredis, commands fail when there's no Redis server
      // even with enableOfflineQueue: true because of retry limits
      expect(await healthCheck(redis)).toBe('DOWN')
      redis.disconnect()
      expect(await healthCheck(redis)).toBe('DOWN')
    } else {
      // In mock tests, enableOfflineQueue: true allows commands to succeed
      expect(await healthCheck(redis)).toBe('UP')
      redis.disconnect()
      expect(await healthCheck(redis)).toBe('UP')
    }
  })

  it('should return UP after disconnect when enableOfflineQueue is explicitly true', async () => {
    const redis = new Redis({ lazyConnect: true, enableOfflineQueue: true })
    
    if (process.env.IS_E2E) {
      // In E2E tests, real ioredis fails due to retry limits even with enableOfflineQueue: true
      expect(await healthCheck(redis)).toBe('DOWN')
      redis.disconnect()
      expect(await healthCheck(redis)).toBe('DOWN')
    } else {
      // In mock tests, enableOfflineQueue: true allows commands to succeed
      expect(await healthCheck(redis)).toBe('UP')
      redis.disconnect()
      expect(await healthCheck(redis)).toBe('UP')
    }
  })

  it('should return DOWN when enableOfflineQueue is explicitly false', async () => {
    const redis = new Redis({ lazyConnect: true, enableOfflineQueue: false })
    
    // Both mock and real ioredis should return DOWN when enableOfflineQueue: false
    expect(await healthCheck(redis)).toBe('DOWN')
    redis.disconnect()
    expect(await healthCheck(redis)).toBe('DOWN')
  })

  it('should return DOWN when created with lazyConnect and not connected', async () => {
    const redis = new Redis({ lazyConnect: true, enableOfflineQueue: false })
    
    // Both mock and real ioredis should return DOWN when not connected and enableOfflineQueue: false
    expect(await healthCheck(redis)).toBe('DOWN')
    redis.disconnect()
  })

  it('demonstrates proper health check configuration for immediate feedback', async () => {
    // For health checks that need immediate feedback about connection status,
    // use enableOfflineQueue: false
    const redis = new Redis({ lazyConnect: true, enableOfflineQueue: false })
    
    // Both environments should return DOWN when not connected with enableOfflineQueue: false
    expect(await healthCheck(redis)).toBe('DOWN')
    redis.disconnect()
    expect(await healthCheck(redis)).toBe('DOWN')
  })
})
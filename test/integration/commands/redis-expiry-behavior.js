import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('Redis expiry behavior conformance', () => {
  describe('Redis-compatible expiry behavior', () => {
    it('should exclude expired keys from enumeration like real Redis', async () => {
      const redis = new Redis()

      // Reproduce the exact scenario from issue #361
      await redis.setex('test', 1, 'test val')
      
      // Initially, key should be accessible
      expect(await redis.get('test')).toBe('test val')
      expect(await redis.keys('*')).toContain('test')
      expect(await redis.dbsize()).toBe(1)
      
      // Wait for expiry (1100ms for 1s TTL to ensure expiration)
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      // After expiry: GET returns null, TTL returns -2 (Redis standard)
      expect(await redis.get('test')).toBe(null)
      expect(await redis.ttl('test')).toBe(-2)
      
      // Real Redis behavior: expired keys are excluded from enumeration
      const keysAfterExpiry = await redis.keys('*')
      expect(keysAfterExpiry).toEqual([])
      expect(await redis.dbsize()).toBe(0)
      expect(await redis.randomkey()).toBe(null)
      
      // Scan should also exclude expired keys
      const [, scanKeys] = await redis.scan(0)
      expect(scanKeys).toEqual([])

      redis.disconnect()
    })

    it('should handle multiple expired keys consistently', async () => {
      const redis = new Redis()

      // Set multiple keys with different expiry times
      await redis.setex('expires-fast', 1, 'value1')
      await redis.setex('expires-slow', 2, 'value2')
      await redis.set('never-expires', 'value3')
      
      // Wait for first key to expire
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      // After first expiry, only 2 keys should remain
      expect(await redis.keys('*')).toHaveLength(2)
      expect(await redis.dbsize()).toBe(2)
      
      // The fast-expiring key should be gone, others remain
      const keysAfterFirst = (await redis.keys('*')).sort()
      expect(keysAfterFirst).toEqual(['expires-slow', 'never-expires'])
      
      // Wait for second key to expire
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // After second expiry, only never-expires should remain
      expect(await redis.keys('*')).toHaveLength(1)
      expect(await redis.dbsize()).toBe(1)
      expect(await redis.keys('*')).toEqual(['never-expires'])
      
      redis.disconnect()
    })

    it('should exclude all expired keys from enumeration', async () => {
      const redis = new Redis()

      // Set multiple expiring keys
      await redis.setex('key1', 1, 'val1')
      await redis.setex('key2', 1, 'val2') 
      await redis.setex('key3', 1, 'val3')
      
      // Initially all present
      expect(await redis.keys('*')).toHaveLength(3)
      expect(await redis.dbsize()).toBe(3)
      
      // Wait for all to expire
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      // All should be excluded from enumeration
      expect(await redis.keys('*')).toEqual([])
      expect(await redis.dbsize()).toBe(0)
      expect(await redis.randomkey()).toBe(null)
      
      // But GET should still return null (not throw)
      expect(await redis.get('key1')).toBe(null)
      expect(await redis.get('key2')).toBe(null)
      expect(await redis.get('key3')).toBe(null)
      
      redis.disconnect()
    })

    it('should demonstrate the fix for issue #361', async () => {
      const redis = new Redis()

      // Exact scenario from the issue
      await redis.setex('test', 1, 'test val')
      
      // Before expiry
      expect(await redis.get('test')).toBe('test val')
      expect(await redis.keys('*')).toEqual(['test'])
      
      // Wait for expiry 
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      // The fix: both GET and KEYS should reflect expiration
      expect(await redis.get('test')).toBe(null)      // GET returns null
      expect(await redis.keys('*')).toEqual([])       // KEYS is empty (FIXED!)
      
      redis.disconnect()
    })
  })
})
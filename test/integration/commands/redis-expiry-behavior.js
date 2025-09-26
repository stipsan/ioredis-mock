import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('Redis expiry behavior conformance', () => {
  describe('Redis-compatible expiry behavior', () => {
    it('should demonstrate ioredis-mock lazy expiration behavior', async () => {
      const redis = new Redis()

      // Reproduce the exact scenario from issue #361
      await redis.setex('test', 1, 'test val')
      
      // Initially, key should be accessible
      expect(await redis.get('test')).toBe('test val')
      expect(await redis.keys('*')).toContain('test')
      expect(await redis.dbsize()).toBe(1)
      
      // Wait for expiry (1100ms for 1s TTL to ensure expiration)
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      // The key is expired but still in enumeration until accessed
      let keysBeforeAccess = await redis.keys('*')
      expect(keysBeforeAccess).toContain('test')
      expect(await redis.dbsize()).toBe(1)
      
      // Now access the expired key - this triggers cleanup
      expect(await redis.get('test')).toBe(null)
      expect(await redis.ttl('test')).toBe(-2)
      
      // After accessing, the key is removed from enumeration
      const keysAfterAccess = await redis.keys('*')
      expect(keysAfterAccess).toEqual([])
      expect(await redis.dbsize()).toBe(0)

      redis.disconnect()
    })

    it('should show expired keys remain in enumeration until accessed', async () => {
      const redis = new Redis()

      // Set multiple keys with different expiry times
      await redis.setex('expires-fast', 1, 'value1')
      await redis.setex('expires-slow', 2, 'value2')
      await redis.set('never-expires', 'value3')
      
      // Wait for first key to expire
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      // All keys still present in enumeration (expired keys not cleaned up yet)
      expect(await redis.keys('*')).toHaveLength(3)
      expect(await redis.dbsize()).toBe(3)
      
      // Accessing expired key triggers cleanup
      expect(await redis.get('expires-fast')).toBe(null)
      
      // Now the accessed expired key is gone from enumeration
      expect(await redis.keys('*')).toHaveLength(2)
      expect(await redis.dbsize()).toBe(2)
      
      // The other expired key (not accessed) remains in enumeration
      expect(await redis.keys('*')).toContain('expires-slow')
      expect(await redis.keys('*')).toContain('never-expires')
      
      redis.disconnect()
    })

    it('should handle multiple expired keys consistently', async () => {
      const redis = new Redis()

      // Set multiple expiring keys
      await redis.setex('key1', 1, 'val1')
      await redis.setex('key2', 1, 'val2') 
      await redis.setex('key3', 1, 'val3')
      
      // Wait for all to expire
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      // All keys still in enumeration until accessed
      let keys = await redis.keys('*')
      expect(keys).toContain('key1')
      expect(keys).toContain('key2') 
      expect(keys).toContain('key3')
      expect(await redis.dbsize()).toBe(3)
      
      // Access one expired key - it gets cleaned up
      expect(await redis.get('key1')).toBe(null)
      
      // Now only 2 keys remain in enumeration
      keys = await redis.keys('*')
      expect(keys).not.toContain('key1')
      expect(keys).toContain('key2')
      expect(keys).toContain('key3')
      expect(await redis.dbsize()).toBe(2)
      
      redis.disconnect()
    })

    it('should demonstrate the scenario from issue #361', async () => {
      const redis = new Redis()

      // Exact scenario from the issue
      await redis.setex('test', 1, 'test val')
      
      // Before expiry
      expect(await redis.get('test')).toBe('test val')
      
      // Wait for expiry 
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      // The behavior described in issue #361:
      // GET returns null but KEYS still shows the expired key
      expect(await redis.keys('*')).toContain('test') // Key still in enumeration
      expect(await redis.get('test')).toBe(null)      // But GET returns null
      
      // After GET accesses it, the key is cleaned up
      expect(await redis.keys('*')).toEqual([])       // Now KEYS is empty
      
      redis.disconnect()
    })
  })
})
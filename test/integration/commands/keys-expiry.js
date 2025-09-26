import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('keys', (command, equals) => {
  describe(`${command} expiry handling`, () => {
    it('should not return expired keys', async () => {
      const redis = new Redis()

      // Set a key with 1 second expiry
      await redis.setex('expiring-key', 1, 'value')
      await redis.set('normal-key', 'value')

      // Before expiry, both keys should be present
      const keysBefore = await redis[command]('*')
      const sortedKeysBefore = keysBefore.sort()
      expect(equals(sortedKeysBefore[0], 'expiring-key')).toBe(true)
      expect(equals(sortedKeysBefore[1], 'normal-key')).toBe(true)

      // Wait for expiry (with buffer to ensure expiration)
      await new Promise(resolve => setTimeout(resolve, 1100))

      // After expiry, only normal-key should be present
      const keysAfter = await redis[command]('*')
      expect(keysAfter).toHaveLength(1)
      expect(equals(keysAfter[0], 'normal-key')).toBe(true)

      // Verify the expired key is truly gone
      expect(await redis.get('expiring-key')).toBe(null)
      expect(await redis.ttl('expiring-key')).toBe(-2)

      redis.disconnect()
    })

    it('should not return expired keys when using patterns', async () => {
      const redis = new Redis()

      // Set keys with different prefixes
      await redis.setex('temp:expiring', 1, 'value')
      await redis.set('temp:normal', 'value')
      await redis.set('other:key', 'value')

      // Before expiry, temp keys should be present
      const tempKeysBefore = await redis[command]('temp:*')
      const sortedTempKeysBefore = tempKeysBefore.sort()
      expect(sortedTempKeysBefore).toHaveLength(2)
      expect(equals(sortedTempKeysBefore[0], 'temp:expiring')).toBe(true)
      expect(equals(sortedTempKeysBefore[1], 'temp:normal')).toBe(true)

      // Wait for expiry
      await new Promise(resolve => setTimeout(resolve, 1100))

      // After expiry, only temp:normal should be present
      const tempKeysAfter = await redis[command]('temp:*')
      expect(tempKeysAfter).toHaveLength(1)
      expect(equals(tempKeysAfter[0], 'temp:normal')).toBe(true)

      // Other keys should still be present
      const otherKeys = await redis[command]('other:*')
      expect(otherKeys).toHaveLength(1)
      expect(equals(otherKeys[0], 'other:key')).toBe(true)

      redis.disconnect()
    })
  })
})
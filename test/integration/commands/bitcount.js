import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('bitcount', command => {
  describe(command, () => {
    it('should return 0 for a missing key', async () => {
      const redis = new Redis()
      expect(await redis[command]('nonexistent')).toBe(0)
      redis.disconnect()
    })

    it('should count bits of full value', async () => {
      const redis = new Redis()
      await redis.set('foo', 'abc')

      // 'a' = 0x61 = 01100001 (3 bits)
      // 'b' = 0x62 = 01100010 (3 bits)
      // 'c' = 0x63 = 01100011 (4 bits)
      // Total: 10 bits
      expect(await redis[command]('foo')).toBe(10)
      redis.disconnect()
    })

    it('should count bits with range inside bounds', async () => {
      const redis = new Redis()
      await redis.set('foo', 'abc')

      // Count only first byte 'a' = 0x61 (3 bits)
      expect(await redis[command]('foo', 0, 0)).toBe(3)

      // Count bytes 1-2 'bc' = 0x62 + 0x63 (3 + 4 = 7 bits)
      expect(await redis[command]('foo', 1, 2)).toBe(7)

      redis.disconnect()
    })

    it('should clamp end beyond length', async () => {
      const redis = new Redis()
      await redis.set('foo', 'abc')

      // Should count all 3 bytes despite end=100
      expect(await redis[command]('foo', 0, 100)).toBe(10)
      redis.disconnect()
    })

    it('should handle negative indexes', async () => {
      const redis = new Redis()
      await redis.set('foo', 'abc')

      // -2 = byte 1 'b', -1 = byte 2 'c' (3 + 4 = 7 bits)
      expect(await redis[command]('foo', -2, -1)).toBe(7)

      // -1 = byte 2 'c' (4 bits)
      expect(await redis[command]('foo', -1, -1)).toBe(4)

      redis.disconnect()
    })

    it('should return 0 when start > end', async () => {
      const redis = new Redis()
      await redis.set('foo', 'abc')

      expect(await redis[command]('foo', 2, 1)).toBe(0)
      redis.disconnect()
    })

    it('should return 0 when start >= length', async () => {
      const redis = new Redis()
      await redis.set('foo', 'abc')

      expect(await redis[command]('foo', 3, 5)).toBe(0)
      expect(await redis[command]('foo', 10, 20)).toBe(0)
      redis.disconnect()
    })

    it('should work with Buffer values', async () => {
      const redis = new Redis()
      const buffer = Buffer.from([0x00, 0xff, 0x0f])
      await redis.set('foo', buffer)

      // 0x00 = 0 bits, 0xff = 8 bits, 0x0f = 4 bits = 12 total
      expect(await redis[command]('foo')).toBe(12)

      // Only middle byte 0xff = 8 bits
      expect(await redis[command]('foo', 1, 1)).toBe(8)

      redis.disconnect()
    })

    it('should handle negative indices that normalize to negative', async () => {
      const redis = new Redis()
      await redis.set('foo', 'a') // 1 byte

      // -5 normalizes to 1 + (-5) = -4, clamped to 0
      expect(await redis[command]('foo', -5, -1)).toBe(3) // Should count byte 0
      redis.disconnect()
    })

    it('should handle edge case with empty string', async () => {
      const redis = new Redis()
      await redis.set('foo', '')

      expect(await redis[command]('foo')).toBe(0)
      expect(await redis[command]('foo', 0, 0)).toBe(0)
      redis.disconnect()
    })

    it('should handle single character', async () => {
      const redis = new Redis()
      await redis.set('foo', 'A') // 0x41 = 01000001 (2 bits)

      expect(await redis[command]('foo')).toBe(2)
      expect(await redis[command]('foo', 0, 0)).toBe(2)
      redis.disconnect()
    })
  })
})

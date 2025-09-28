import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('bitfield', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should handle GET operations on non-existent key', async () => {
      const result = await redis[command]('nonexistent', 'get', 'u8', '0')
      expect(result).toEqual([0])
    })

    it('should handle basic SET and GET operations', async () => {
      // Set a value and check the old value is returned
      let result = await redis[command]('test:basic', 'set', 'u8', '0', '255')
      expect(result).toEqual([0])

      // Get the value we just set
      result = await redis[command]('test:basic', 'get', 'u8', '0')
      expect(result).toEqual([255])
    })

    it('should handle signed integers', async () => {
      // Set negative value
      let result = await redis[command]('test:signed', 'set', 'i8', '0', '-128')
      expect(result).toEqual([0])

      // Get the negative value
      result = await redis[command]('test:signed', 'get', 'i8', '0')
      expect(result).toEqual([-128])
    })

    it('should handle INCRBY operations', async () => {
      // Set initial value
      await redis[command]('test:incr', 'set', 'u8', '0', '10')
      
      // Increment by 5
      const result = await redis[command]('test:incr', 'incrby', 'u8', '0', '5')
      expect(result).toEqual([15])
      
      // Verify the new value
      const getResult = await redis[command]('test:incr', 'get', 'u8', '0')
      expect(getResult).toEqual([15])
    })

    it('should handle multiple operations in one command', async () => {
      const result = await redis[command]('test:multi', 
        'set', 'u8', '0', '100',
        'get', 'u8', '0',
        'incrby', 'u8', '0', '50'
      )
      expect(result).toEqual([0, 100, 150])
    })

    it('should handle OVERFLOW WRAP behavior (default)', async () => {
      // Set max value for u8
      await redis[command]('test:overflow', 'set', 'u8', '0', '255')
      
      // Increment by 1, should wrap to 0
      const result = await redis[command]('test:overflow', 'incrby', 'u8', '0', '1')
      expect(result).toEqual([0])
    })

    it('should handle OVERFLOW SAT behavior', async () => {
      // Set max value for u8
      await redis[command]('test:sat', 'set', 'u8', '0', '255')
      
      // Set overflow to SAT and increment by 1, should saturate at 255
      const result = await redis[command]('test:sat', 
        'overflow', 'sat',
        'incrby', 'u8', '0', '1'
      )
      expect(result).toEqual([255])
    })

    it('should handle OVERFLOW FAIL behavior', async () => {
      // Set max value for u8
      await redis[command]('test:fail', 'set', 'u8', '0', '255')
      
      // Set overflow to FAIL and increment by 1, should return null
      const result = await redis[command]('test:fail', 
        'overflow', 'fail',
        'incrby', 'u8', '0', '1'
      )
      expect(result).toEqual([null])
    })

    it('should handle different bit widths', async () => {
      const result = await redis[command]('test:widths',
        'set', 'u4', '0', '15',
        'set', 'u16', '16', '65535',
        'get', 'u4', '0',
        'get', 'u16', '16'
      )
      expect(result).toEqual([0, 0, 15, 65535])
    })

    it('should handle bit offsets correctly', async () => {
      // Set bits at different offsets
      const result = await redis[command]('test:offsets',
        'set', 'u8', '0', '170',  // 10101010
        'set', 'u8', '8', '85',   // 01010101
        'get', 'u8', '0',
        'get', 'u8', '8'
      )
      expect(result).toEqual([0, 0, 170, 85])
    })

    it('should throw error for invalid type specification', async () => {
      await expect(redis[command]('test', 'get', 'invalid', '0'))
        .rejects.toThrow('ERR Invalid bitfield type')
    })

    it('should throw error for u64 (unsupported)', async () => {
      await expect(redis[command]('test', 'get', 'u64', '0'))
        .rejects.toThrow('ERR Invalid bitfield type')
    })

    it('should throw error for invalid bit width', async () => {
      await expect(redis[command]('test', 'get', 'u65', '0'))
        .rejects.toThrow('ERR Invalid bitfield type')
    })

    it('should throw error for invalid operation', async () => {
      await expect(redis[command]('test', 'invalid', 'u8', '0'))
        .rejects.toThrow('ERR Unknown BITFIELD operation')
    })

    it('should throw error for wrong number of arguments', async () => {
      await expect(redis[command]('test'))
        .rejects.toThrow('ERR wrong number of arguments')
    })

    it('should throw error for large offsets', async () => {
      await expect(redis[command]('test', 'get', 'u8', String(2 ** 32)))
        .rejects.toThrow('ERR bit offset is not an integer or out of range')
    })

    it('should work with existing data from other bit operations', async () => {
      // Set some data with SETBIT
      await redis.setbit('test:mixed', 1, 1)
      await redis.setbit('test:mixed', 3, 1)
      await redis.setbit('test:mixed', 5, 1)
      await redis.setbit('test:mixed', 7, 1)
      
      // Should read as binary 01010101 = 85
      const result = await redis[command]('test:mixed', 'get', 'u8', '0')
      expect(result).toEqual([85])
    })
  })
})
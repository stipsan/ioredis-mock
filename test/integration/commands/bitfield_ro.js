import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('bitfield_ro', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should handle GET operations on non-existent key', async () => {
      const result = await redis[command]('nonexistent', 'get', 'u8', '0')
      expect(result).toEqual([0])
    })

    it('should handle basic GET operations', async () => {
      // First set data with regular BITFIELD
      await redis.bitfield('test:readonly', 'set', 'u8', '0', '255')

      // Then read with BITFIELD_RO
      const result = await redis[command]('test:readonly', 'get', 'u8', '0')
      expect(result).toEqual([255])
    })

    it('should handle signed integers', async () => {
      // Set negative value with regular BITFIELD
      await redis.bitfield('test:signed:ro', 'set', 'i8', '0', '-128')

      // Read with BITFIELD_RO
      const result = await redis[command]('test:signed:ro', 'get', 'i8', '0')
      expect(result).toEqual([-128])
    })

    it('should handle multiple GET operations in one command', async () => {
      // Set up data
      await redis.bitfield('test:multi:ro', 
        'set', 'u8', '0', '100',
        'set', 'u8', '8', '200'
      )
      
      // Read multiple values
      const result = await redis[command]('test:multi:ro', 
        'get', 'u8', '0',
        'get', 'u8', '8'
      )
      expect(result).toEqual([100, 200])
    })

    it('should handle OVERFLOW command (but have no effect)', async () => {
      // Set up data
      await redis.bitfield('test:overflow:ro', 'set', 'u8', '0', '255')
      
      // OVERFLOW should be ignored in read-only mode
      const result = await redis[command]('test:overflow:ro', 
        'overflow', 'fail',
        'get', 'u8', '0'
      )
      expect(result).toEqual([255])
    })

    it('should throw error for SET operations', async () => {
      await expect(redis[command]('test', 'set', 'u8', '0', '10'))
        .rejects.toThrow('ERR BITFIELD_RO only supports the GET subcommand')
    })

    it('should throw error for INCRBY operations', async () => {
      await expect(redis[command]('test', 'incrby', 'u8', '0', '5'))
        .rejects.toThrow('ERR BITFIELD_RO only supports the GET subcommand')
    })

    it('should throw error for invalid type specification', async () => {
      await expect(redis[command]('test', 'get', 'invalid', '0'))
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

    it('should work with existing data from other bit operations', async () => {
      // Set some data with SETBIT
      await redis.setbit('test:mixed:ro', 1, 1)
      await redis.setbit('test:mixed:ro', 3, 1)
      await redis.setbit('test:mixed:ro', 5, 1)
      await redis.setbit('test:mixed:ro', 7, 1)
      
      // Should read as binary 01010101 = 85
      const result = await redis[command]('test:mixed:ro', 'get', 'u8', '0')
      expect(result).toEqual([85])
    })

    it('should handle different bit widths', async () => {
      // Set up data with regular BITFIELD
      await redis.bitfield('test:widths:ro',
        'set', 'u4', '0', '15',
        'set', 'u16', '16', '65535'
      )
      
      // Read with BITFIELD_RO
      const result = await redis[command]('test:widths:ro',
        'get', 'u4', '0',
        'get', 'u16', '16'
      )
      expect(result).toEqual([15, 65535])
    })
  })
})
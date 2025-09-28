import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../test-utils'

runTwinSuite('database isolation', () => {
  describe('database isolation', () => {
    test('should isolate data between different databases', async () => {
      const redis1 = new Redis({ db: 0 })
      const redis2 = new Redis({ db: 1 })

      // Set a key in database 0
      await redis1.set('isolationTest', 'valueFromDb0')

      // Set a different value for the same key in database 1
      await redis2.set('isolationTest', 'valueFromDb1')

      // Get the values back
      const valueFromDb0 = await redis1.get('isolationTest')
      const valueFromDb1 = await redis2.get('isolationTest')

      // Values should be different as they're in different databases
      expect(valueFromDb0).toBe('valueFromDb0')
      expect(valueFromDb1).toBe('valueFromDb1')

      redis1.disconnect()
      redis2.disconnect()
    })

    test('should not share data between same host:port but different databases', async () => {
      const redis1 = new Redis({ host: 'localhost', port: 6379, db: 0 })
      const redis2 = new Redis({ host: 'localhost', port: 6379, db: 1 })

      // Initially both should return null
      expect(await redis1.get('sharedTest')).toBe(null)
      expect(await redis2.get('sharedTest')).toBe(null)

      // Set a key only in db 0
      await redis1.set('sharedTest', 'onlyInDb0')

      // db 0 should have the value, db 1 should still be null
      expect(await redis1.get('sharedTest')).toBe('onlyInDb0')
      expect(await redis2.get('sharedTest')).toBe(null)

      redis1.disconnect()
      redis2.disconnect()
    })

    test('should have different contexts for different databases', async () => {
      const redis1 = new Redis({ db: 0 })
      const redis2 = new Redis({ db: 1 })

      // Set different data in each database
      await redis1.hset('contextTest', 'field1', 'value1')
      await redis2.hset('contextTest', 'field1', 'value2')

      // Values should be isolated
      expect(await redis1.hget('contextTest', 'field1')).toBe('value1')
      expect(await redis2.hget('contextTest', 'field1')).toBe('value2')

      // Key existence should also be isolated
      await redis1.del('contextTest')
      expect(await redis1.exists('contextTest')).toBe(0)
      expect(await redis2.exists('contextTest')).toBe(1)

      redis1.disconnect()
      redis2.disconnect()
    })

    test('should default to database 0 when no db specified', async () => {
      const redisDefault = new Redis()
      const redisDb0 = new Redis({ db: 0 })

      // Both should share the same context since they're both using db 0
      await redisDefault.set('defaultTest', 'sharedValue')
      expect(await redisDb0.get('defaultTest')).toBe('sharedValue')

      await redisDb0.set('defaultTest', 'modifiedValue')
      expect(await redisDefault.get('defaultTest')).toBe('modifiedValue')

      redisDefault.disconnect()
      redisDb0.disconnect()
    })
  })
})

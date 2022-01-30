import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('role', (command, equals) => {
  describe(command, () => {
    test('should return role info on the current redis instance', async () => {
      const redis = new Redis()

      const result = await redis[command]()
      expect(equals(result[0], 'master')).toBe(true)
      expect(result[1]).toBe(0)

      redis.disconnect()
    })
  })
})

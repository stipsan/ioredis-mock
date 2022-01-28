import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('quit', (command, equals) => {
  describe(command, () => {
    it('should return OK', async () => {
      const redis = new Redis()
      expect(equals(await redis[command](), 'OK')).toBe(true)
    })
  })
})

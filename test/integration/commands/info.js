import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('info', command => {
  describe(command, () => {
    it('should return default info with CRLF', async () => {
      const redis = new Redis()
      let value = await redis[command]()
      if (command === 'infoBuffer') {
        expect(Buffer.isBuffer(value)).toBe(true)
        value = value.toString()
      }
      const lines = value.split('\r\n')

      expect(lines).toHaveLength(value.split('\n').length)
      expect(lines.some(line => line.startsWith('redis_version:'))).toBeTruthy()
      redis.disconnect()
    })
  })
})

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
      expect(
        value.split('\r\n').find(line => line.indexOf('redis_version') !== -1)
      ).toMatchSnapshot()
      redis.disconnect()
    })

    it('should return the Redis version number used during end-to-end testing', async () => {
      const redis = new Redis()
      let value = await redis[command]()
      if (command === 'infoBuffer') {
        expect(Buffer.isBuffer(value)).toBe(true)
        value = value.toString()
      }

      expect(
        value.split('\n').find(line => line.indexOf('redis_version') !== -1)
      ).toMatchSnapshot()
      redis.disconnect()
    })

    ;(process.env.IS_E2E ? it.skip : it)('should return enough info to be useful', async () => {
      const redis = new Redis()
      let value = await redis[command]()
      if (command === 'infoBuffer') {
        expect(Buffer.isBuffer(value)).toBe(true)
        value = value.toString()
      }

      expect(
        value.split('\n')
      ).toMatchSnapshot()
      redis.disconnect()
    })
  })
})

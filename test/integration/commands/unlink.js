import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('unlink', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should unlink/delete passed in keys', async () => {
      await redis.set('unlinkme', 'please')
      await redis.set('metoo', 'pretty please')

      expect(await redis[command]('unlinkme', 'metoo')).toBe(2)

      expect(await redis.get('unlinkme')).toBe(null)
      expect(await redis.get('metoo')).toBe(null)
    })
    it('should return the number of keys unlinked', async () => {
      return redis[command]('deleteme', 'metoo').then(status => {
        return expect(status).toBe(0)
      })
    })
  })
})

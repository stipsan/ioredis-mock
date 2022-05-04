import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('del', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => redis.disconnect())

    it('should delete passed in keys', async () => {
      await redis.set('deleteme', 'please')
      await redis.set('metoo', 'pretty please')

      expect(await redis[command]('deleteme', 'metoo')).toBe(2)
      expect(await redis.get('deleteme')).toBe(null)
      expect(await redis.get('metoo')).toBe(null)
    })
    it('return 0 if nothing is deleted', async () => {
      expect(await redis[command]('deleteme', 'metoo')).toBe(0)
    })

    it('return 0 if nothing is deleted', async () => {
      expect(await redis[command]('deleteme', 'metoo')).toBe(0)
    })

    it('throws if too few arguments', async () => {
      expect.assertions(1)

      try {
        await redis[command]()
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })
  })
})

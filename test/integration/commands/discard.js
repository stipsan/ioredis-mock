import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

runTwinSuite('discard', command => {
  browserSafeDescribe(command)(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should discard any batch queue ', async () => {
      expect.assertions(1)

      await redis.multi({ pipeline: false })
      await redis.incr('user_next')
      const result = await redis[command]()
      expect(result).toMatchSnapshot()
    })

    it('errors if you discard without starting a pipeline', async () => {
      expect.assertions(1)

      try {
        await redis[command]()
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })
  })
})

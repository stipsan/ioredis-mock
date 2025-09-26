import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

runTwinSuite('lolwut', command => {
  browserSafeDescribe(command)(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    test('version 8', async () => {
      const result = await redis[command]()
      expect(
        Buffer.isBuffer(result) ? result.toString() : result
      ).toMatchSnapshot()
    })

    test('version 7', async () => {
      const result = await redis[command]('version', 7, 20, 10)
      expect(Buffer.isBuffer(result) ? result.toString() : result).toMatch(
        'Redis ver'
      )
    })

    test('version 6', async () => {
      const result = await redis[command]('version', 6, 20, 10)
      expect(Buffer.isBuffer(result) ? result.toString() : result).toMatch(
        'hikikomori'
      )
    })

    test('version 5', async () => {
      const result = await redis[command]('version', 5, 20, 10)
      expect(Buffer.isBuffer(result) ? result.toString() : result).toMatch(
        'schotter'
      )
    })
  })
})

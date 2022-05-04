import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('sintercard', command => {
  // @TODO: implement this command
  ;(process.env.IS_E2E ? describe : describe.skip)(command, () => {
    const redis = new Redis()

    beforeEach(async () => {
      await Promise.all(
        [
          ['key1', 'a'],
          ['key1', 'b'],
          ['key1', 'c'],
          ['key1', 'd'],
          ['key2', 'c'],
          ['key2', 'd'],
          ['key2', 'e'],
          // eslint-disable-next-line arrow-body-style
        ].map(args => redis.sadd(...args))
      )
    })

    afterAll(() => {
      redis.disconnect()
    })

    test('SINTERCARD 2 key1 key2', async () => {
      const result = await redis[command](2, 'key1', 'key2')
      expect(result).toMatchSnapshot()
    })

    test('SINTERCARD 2 key1 key2 LIMIT 1', async () => {
      const result = await redis[command](2, 'key1', 'key2', 'LIMIT', 1)
      expect(result).toMatchSnapshot()
    })
  })
})

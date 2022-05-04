import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

runTwinSuite('sunion', command => {
  browserSafeDescribe(command)(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return the union between the first set and all the successive sets', async () => {
      expect.assertions(1)
      await redis.sadd('key1', 'a', 'b', 'c', 'd')
      await redis.sadd('key2', 'c')
      await redis.sadd('key4', 'a', 'c', 'e')

      const result = await redis[command]('key1', 'key2', 'key3', 'key4')
      result.sort()
      expect(result).toMatchSnapshot()
    })

    it('should throw an exception if one of the keys is not a set', async () => {
      expect.assertions(1)
      await redis.sadd('foo', 'bar')
      await redis.set('bar', 'not a set')

      try {
        await redis[command]('foo', 'bar')
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })
  })
})

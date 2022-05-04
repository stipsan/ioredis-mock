import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

runTwinSuite('sunionstore', command => {
  browserSafeDescribe(command)(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should store the union between the first set and all the successive sets at dest', async () => {
      expect.assertions(2)
      await redis.sadd('key1', 'a', 'b', 'c', 'd')
      await redis.sadd('key2', 'c')
      await redis.sadd('key4', 'a', 'c', 'e')

      const count = await redis[command]('dest', 'key1', 'key2', 'key3', 'key4')
      expect(count).toEqual(5)

      const result = await redis.smembers('dest')
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

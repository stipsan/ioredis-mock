import Redis from 'ioredis'
import { convertBufferToString } from 'ioredis/built/utils'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

runTwinSuite('srandmember', command => {
  browserSafeDescribe(command)(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should return a random item', async () => {
      expect.assertions(1)
      await redis.sadd('myset', 'one', 'two', 'three')

      const result = convertBufferToString(await redis[command]('myset'))
      expect(['one', 'two', 'three']).toContain(result)
    })

    it('should return random unique items', async () => {
      expect.assertions(3)
      await redis.sadd('myset', 'one', 'two', 'three')

      const results = convertBufferToString(await redis[command]('myset', 2))
      expect(['one', 'two', 'three']).toContain(results[0])
      expect(['one', 'two', 'three']).toContain(results[1])
      expect(results[0]).not.toBe(results[1])
    })

    it('should return set if positive count is bigger than set', async () => {
      expect.assertions(3)
      await redis.sadd('myset', 'one', 'two', 'three')

      const results = convertBufferToString(await redis[command]('myset', 5))
      expect(['one', 'two', 'three']).toContain(results[0])
      expect(['one', 'two', 'three']).toContain(results[1])
      expect(['one', 'two', 'three']).toContain(results[2])
    })

    it('should return random items with specified length', async () => {
      expect.assertions(1)
      await redis.sadd('myset', 'one', 'two', 'three')

      const results = convertBufferToString(await redis[command]('myset', -5))
      expect(results.length).toBe(5)
    })

    it('should return null if set is empty', async () => {
      expect.assertions(1)

      const result = convertBufferToString(await redis[command]('myset'))
      expect(result).toBe(null)
    })

    it('should throw an exception if the key contains something other than a set', async () => {
      expect.assertions(1)
      await redis.set('foo', 'not a set')

      try {
        await redis[command]('foo')
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })
  })
})

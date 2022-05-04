import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

runTwinSuite('srem', command => {
  browserSafeDescribe(command)(command, () => {
    const redis = new Redis()

    beforeEach(async () => {
      await redis.sadd('foos', 'bar', 'foo', 'baz', 'bazooka')
    })

    afterAll(() => {
      redis.disconnect()
    })

    it('should remove 1 item from set', async () => {
      expect.assertions(2)

      const status = await redis[command]('foos', 'bar')
      expect(status).toBe(1)

      const results = await redis.smembers('foos')
      expect(results).not.toContain('bar')
    })

    it('should remove 2 items from set', async () => {
      expect.assertions(3)

      const status = await redis[command]('foos', 'foo', 'baz', 'none existent')
      expect(status).toBe(2)

      const results = await redis.smembers('foos')
      expect(results).not.toContain('foo')
      expect(results).not.toContain('baz')
    })

    it("should return 0 if source don't exists", async () => {
      expect.assertions(1)

      const status = await redis[command]('bars', 'foo')
      expect(status).toBe(0)
    })

    it('should throw an exception if the key contains something other than a set', async () => {
      expect.assertions(1)
      await redis.set('foo', 'not a set')

      try {
        await redis[command]('foo', 'bar')
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hexists', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    describe('hash exists', () => {
      it('should return 1 if key exists in hash map', async () => {
        await redis.hset('foo', 'bar', 'baz')
        return redis[command]('foo', 'bar').then(status =>
          expect(status).toBe(1)
        )
      })

      it('should return 0 if key not exists in hash map', async () => {
        await redis.hset('foo', 'bar', 'baz')
        return redis[command]('foo', 'baz').then(status =>
          expect(status).toBe(0)
        )
      })
    })

    describe("hash doesn't exist", () => {
      it('should return 0', () =>
        redis[command]('foo', 'baz').then(status => expect(status).toBe(0)))
    })
  })
})

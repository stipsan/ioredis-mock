import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hexists', command => {
  describe(command, () => {
    describe('hash exists', () => {
      it('should return 1 if key exists in hash map', () => {
        const redis = new Redis({
          data: {
            foo: { bar: 'baz' },
          },
        })
        return redis[command]('foo', 'bar').then(status => {
          return expect(status).toBe(1)
        })
      })

      it('should return 0 if key not exists in hash map', () => {
        const redis = new Redis({
          data: {
            foo: { bar: 'baz' },
          },
        })
        return redis[command]('foo', 'baz').then(status => {
          return expect(status).toBe(0)
        })
      })
    })

    describe("hash doesn't exist", () => {
      it('should return 0', () => {
        const redis = new Redis()
        return redis[command]('foo', 'baz').then(status => {
          return expect(status).toBe(0)
        })
      })
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hstrlen', command => {
  describe(command, () => {
    it('should return 0 on keys that do not exist', () => {
      const redis = new Redis()

      return redis[command]('nonexisting').then(result => {
        return expect(result).toBe(0)
      })
    })

    it('should return 0 on fields that do not exist', () => {
      const redis = new Redis()

      return redis[command]('nonexisting', 'foo').then(result => {
        return expect(result).toBe(0)
      })
    })

    it('should return length on existing fields', () => {
      const redis = new Redis({
        data: {
          mykey: {
            foo: 'Hello world',
          },
        },
      })

      return redis[command]('mykey', 'foo').then(result => {
        return expect(result).toBe(11)
      })
    })
  })
})

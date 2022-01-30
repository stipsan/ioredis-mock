import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hincrbyfloat', command => {
  describe(command, () => {
    it('should increment an float with passed increment', () => {
      const redis = new Redis({
        data: {
          mykey: { field: '10.50' },
        },
      })

      return redis[command]('mykey', 'field', 0.1)
        .then(result => {
          return expect(result).toBe('10.6')
        })
        .then(() => {
          return redis[command]('mykey', 'field', -5)
        })
        .then(result => {
          return expect(result).toBe('5.6')
        })
        .then(() => {
          return expect(redis.data.get('mykey').field).toBe('5.6')
        })
    })

    it('should support exponents', () => {
      const redis = new Redis({
        data: {
          mykey: { field: '5.0e3' },
        },
      })

      return redis[command]('mykey', 'field', '2.0e2')
        .then(result => {
          return expect(result).toBe('5200')
        })
        .then(() => {
          return expect(redis.data.get('mykey').field).toBe('5200')
        })
    })

    it('should create hash if not exists', () => {
      const redis = new Redis()

      return redis[command]('stats', 'health', 0.5)
        .then(result => {
          return expect(result).toBe('0.5')
        })
        .then(() => {
          return expect(redis.data.get('stats').health).toBe('0.5')
        })
    })

    it('should create field in hash if not exists', () => {
      const redis = new Redis({
        data: {
          stats: {},
        },
      })

      return redis[command]('stats', 'health', 0.5)
        .then(result => {
          return expect(result).toBe('0.5')
        })
        .then(() => {
          return expect(redis.data.get('stats').health).toBe('0.5')
        })
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('setbit', command => {
  describe(command, () => {
    it('should return old bit value of key', async () => {
      const redis = new Redis({
        data: {
          foo: '@',
        },
      })
      await redis.set('foo', '@')

      return redis[command]('foo', 1, 0)
        .then(result => {
          return expect(result).toBe(1)
        })
        .finally(() => {
          return redis.disconnect()
        })
    })

    it('should padd if offset out of range', () => {
      const redis = new Redis({})

      return redis[command]('foo', 9, 1)
        .then(result => {
          return expect(result).toBe(0)
        })
        .then(async () => {
          return expect(await redis.get('foo')).toBe('\x00@')
        })
        .finally(() => {
          return redis.disconnect()
        })
    })

    it('should override bit value of key', async () => {
      const redis = new Redis({
        data: {
          foo: 'bar',
        },
      })
      await redis.set('foo', 'bar')

      return redis[command]('foo', 3, 1)
        .then(result => {
          return expect(result).toBe(0)
        })
        .then(async () => {
          return expect(await redis.get('foo')).toBe('rar')
        })
        .finally(() => {
          return redis.disconnect()
        })
    })

    it('should create key if not exist', () => {
      const redis = new Redis({})

      return redis[command]('foo', 1, 1)
        .then(result => {
          return expect(result).toBe(0)
        })
        .then(async () => {
          return expect(await redis.get('foo')).toBe('@')
        })
        .finally(() => {
          return redis.disconnect()
        })
    })

    it('should throw if offset > 2^32', () => {
      const redis = new Redis()

      return redis[command]('foo', 2 ** 32, 1)
        .then(
          () => {
            throw new Error('Expected setbit to fail')
          },
          err => {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe(
              'ERR bit offset is not an integer or out of range'
            )
          }
        )
        .finally(() => {
          return redis.disconnect()
        })
    })

    it('should throw if value is not 1 or 0', () => {
      const redis = new Redis()

      return redis[command]('foo', 1, 10)
        .then(
          () => {
            throw new Error('Expected setbit to fail')
          },
          err => {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe(
              'ERR bit is not an integer or out of range'
            )
          }
        )
        .finally(() => {
          return redis.disconnect()
        })
    })
  })
})

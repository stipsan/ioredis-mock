import Redis from 'ioredis'
import { convertBufferToString } from 'ioredis/built/utils'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hincrbyfloat', command => {
  describe(command, () => {
    it('should increment an float with passed increment', async () => {
      const redis = new Redis()
      await redis.hset('mykey', 'field', '10.50')

      return redis[command]('mykey', 'field', 0.1)
        .then(result =>
          expect(Number(convertBufferToString(result)).toFixed(1)).toBe('10.6')
        )
        .then(() => redis[command]('mykey', 'field', -5))
        .then(result =>
          expect(Number(convertBufferToString(result)).toFixed(1)).toBe('5.6')
        )
        .then(async () =>
          expect(Number(await redis.hget('mykey', 'field')).toFixed(1)).toBe(
            '5.6'
          )
        )
    })

    it('should support exponents', async () => {
      const redis = new Redis()
      await redis.hset('mykey', 'field', '5.0e3')

      return redis[command]('mykey', 'field', '2.0e2')
        .then(result => expect(convertBufferToString(result)).toBe('5200'))
        .then(async () =>
          expect(await redis.hget('mykey', 'field')).toBe('5200')
        )
    })

    it('should create hash if not exists', () => {
      const redis = new Redis()

      return redis[command]('stats', 'health', 0.5)
        .then(result => expect(convertBufferToString(result)).toBe('0.5'))
        .then(async () =>
          expect(await redis.hget('stats', 'health')).toBe('0.5')
        )
    })
  })
})

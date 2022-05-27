import Redis from 'ioredis'
import { convertBufferToString } from 'ioredis/built/utils'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('incrbyfloat', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should initialize the key with 0 if there is no key', () =>
      redis[command]('user_next', 10.1)
        .then(userNext => expect(Number(userNext).toFixed(1)).toBe('10.1'))
        .then(async () =>
          expect(Number(await redis.get('user_next')).toFixed(1)).toBe('10.1')
        ))
    it('should increment an float with passed increment', async () => {
      await redis.set('mykey', '10.50')

      return redis[command]('mykey', 0.1)
        .then(result => expect(Number(result).toFixed(1)).toBe('10.6'))
        .then(() => redis[command]('mykey', -5))
        .then(result => expect(Number(result).toFixed(1)).toBe('5.6'))
        .then(async () =>
          expect(Number(await redis.get('mykey')).toFixed(1)).toBe('5.6')
        )
    })

    it('should support exponents', async () => {
      await redis.set('mykey', '5.0e3')

      return redis[command]('mykey', '2.0e2')
        .then(result => expect(convertBufferToString(result)).toBe('5200'))
        .then(async () => expect(await redis.get('mykey')).toBe('5200'))
    })
  })
})

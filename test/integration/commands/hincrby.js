import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('hincrby', command => {
  describe(command, () => {
    it('should increment an integer with passed increment in hash', async () => {
      const redis = new Redis()
      await redis.hset('highscores', 'user:1', '9000')

      return redis[command]('highscores', 'user:1', 100)
        .then(result => expect(result).toBe(9100))
        .then(async () =>
          expect(await redis.hget('highscores', 'user:1')).toBe('9100')
        )
    })
    it('should create hash if not exists', () => {
      const redis = new Redis()

      return redis[command]('stats', 'hits', 100)
        .then(result => expect(result).toBe(100))
        .then(async () => expect(await redis.hget('stats', 'hits')).toBe('100'))
    })
    it('should decrement value in hash if negative integer is passed', async () => {
      const redis = new Redis()
      await redis.hset('highscores', 'user:1', '9000')

      return redis[command]('highscores', 'user:1', -100)
        .then(result => expect(result).toBe(8900))
        .then(async () =>
          expect(await redis.hget('highscores', 'user:1')).toBe('8900')
        )
    })
  })
})

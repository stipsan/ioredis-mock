import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import sha1 from '../../../src/commands-utils/sha1'
// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('evalsha', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should execute a lua script through evalsha and get the return value', () => {
      const NUMBER_OF_KEYS = 2
      const KEY1 = 'KEY1'
      const KEY2 = 'KEY2'

      return redis
        .set(KEY1, 10)
        .then(() => redis.set(KEY2, 20))
        .then(() => {
          const luaScript = `
              local rcall = redis.call
              local val1 = rcall("GET", KEYS[1])
              local val2 = rcall("GET", KEYS[2])
              local sum = val1 + val2
              return ((val1 + val2) * ARGV[1]) + ARGV[2]
            `
          const scriptSha = sha1(luaScript)
          // first run eval to store the script in cache
          redis.eval(luaScript, NUMBER_OF_KEYS, KEY1, KEY2, 100, 5)
          // run the script by its sha1 hash
          return redis[command](
            scriptSha,
            NUMBER_OF_KEYS,
            KEY1,
            KEY2,
            100,
            5
          ).then(result => expect(result).toEqual(3005))
        })
    })

    it('should be able to ignore errors from pcall', () => {
      const NUMBER_OF_KEYS = 1
      const KEY1 = 'KEY1'

      return redis.set(KEY1, 10).then(() => {
        const luaScript = `
            local before = redis.pcall('GET', KEYS[1])
            redis.pcall('invalid command')
            return before
          `
        const scriptSha = sha1(luaScript)
        // first run eval to store the script in cache
        redis.eval(luaScript, NUMBER_OF_KEYS, KEY1)
        return redis[command](scriptSha, NUMBER_OF_KEYS, KEY1).then(result =>
          expect(equals(result, '10')).toBe(true)
        )
      })
    })

    it('should error with NOSCRIPT if attempted to run a nonexistent sha', async () => {
      expect.hasAssertions()
      const someSha = '5bf1fd927dfb8679496a2e6cf00cbe50c1c87145'

      try {
        await redis[command](someSha, 0)
      } catch (err) {
        expect(err.message).toMatch(
          'NOSCRIPT No matching script. Please use EVAL.'
        )
      }
    })
  })
})

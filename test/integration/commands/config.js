import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('config', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should throw on too few arguments', async () => {
      expect.hasAssertions()

      try {
        await redis[command]()
      } catch (err) {
        expect(err.message).toMatch('wrong number of arguments')
      }
    })

    it('should throw on unknown subcommand', async () => {
      expect.hasAssertions()

      try {
        await redis[command]('foobar')
      } catch (err) {
        expect(err.message).toMatch('Unknown subcommand')
      }
    })

    describe('get', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('get')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }
      })

      it('returns a list over config options', async () => {
        expect(await redis[command]('GET', '*')).toEqual(expect.any(Array))
      })
    })

    describe('set', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('set')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }

        try {
          await redis[command]('SET', 'foo')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }
      })

      it('should throw as we actually do not support setting the config', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('SET', 'maxmockmemory', '1000000')
        } catch (err) {
          expect(err.message).toMatch(
            'ERR Unsupported CONFIG parameter: maxmockmemory'
          )
        }
      })
    })

    describe('resetstat', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('RESETSTAT', 'foo')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }
      })

      it('returns OK', async () => {
        expect(equals(await redis[command]('RESETSTAT'), 'OK')).toBe(true)
      })
    })

    describe('rewrite', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('REWRITE', 'foo')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }
      })

      it('throws as redis is running without a config file', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('REWRITE')
        } catch (err) {
          expect(err.message).toMatch(
            'ERR The server is running without a config file'
          )
        }
      })
    })

    describe('help', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('HELP', 'foo')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }

        try {
          await redis[command]('HELP', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }
      })

      it('prints a list over available subcommands', async () => {
        const result = await redis[command]('HELP')

        expect(
          result.map(val => {
            return Buffer.isBuffer(val) ? val.toString() : val
          })
        ).toEqual([
          'CONFIG <subcommand> [<arg> [value] [opt] ...]. Subcommands are:',
          'GET <pattern>',
          '    Return parameters matching the glob-like <pattern> and their values.',
          'SET <directive> <value>',
          '    Set the configuration <directive> to <value>.',
          'RESETSTAT',
          '    Reset statistics reported by the INFO command.',
          'REWRITE',
          '    Rewrite the configuration file.',
          'HELP',
          '    Prints this help.',
        ])
      })
    })
  })
})

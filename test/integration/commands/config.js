import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

runTwinSuite('config', (command, equals) => {
  browserSafeDescribe(command)(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should throw on too few arguments', async () => {
      expect.hasAssertions()

      try {
        await redis[command]()
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })

    it('should throw on unknown subcommand', async () => {
      expect.hasAssertions()

      try {
        await redis[command]('foobar')
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })

    describe('get', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('get')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
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
          expect(err.message).toMatchSnapshot()
        }

        try {
          await redis[command]('SET', 'foo')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })
      ;(process.env.IS_E2E ? it.skip : it)(
        'should throw as we actually do not support setting the config',
        async () => {
          expect.hasAssertions()

          try {
            await redis[command]('SET', 'maxmemory', '1000000')
          } catch (err) {
            expect(err.message).toMatchSnapshot()
          }
        }
      )
      it('should throw as the option does not exist', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('SET', 'maxmockmemory', '1000000')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })
    })

    describe('resetstat', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('RESETSTAT', 'foo')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
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
          expect(err.message).toMatchSnapshot()
        }
      })

      it('throws as redis is running without a config file', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('REWRITE')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })
    })

    describe('help', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('HELP', 'foo')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }

        try {
          await redis[command]('HELP', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })

      it('prints a list over available subcommands', async () => {
        const result = await redis[command]('HELP')

        expect(result).toMatchSnapshot()
      })
    })
  })
})

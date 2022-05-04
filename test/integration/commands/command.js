import Redis from 'ioredis'
import sortBy from 'lodash.sortby'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite, toMatchSnapshot } from '../../../test-utils'

runTwinSuite('command', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('returns all commands by default', async () => {
      const commands = await redis[command]()

      expect(sortBy(commands, ([cmd]) => cmd))[toMatchSnapshot]()
    })

    it('should throw on unknown subcommand', async () => {
      expect.hasAssertions()

      try {
        await redis[command]('foobar')
      } catch (err) {
        expect(err.message)[toMatchSnapshot]()
      }
    })

    describe('info', () => {
      it('returns nothing on an unknown command', async () => {
        const commands = await redis[command]('info', 'foo')

        expect(commands)[toMatchSnapshot]()
      })

      it('returns the same list as COMMAND without args', async () => {
        const defaults = await redis[command]()
        const commands = await redis[command]('info')

        expect(defaults).toEqual(commands)
      })

      it('returns a command description', async () => {
        const commands = await redis[command]('info', 'get', 'sinter')

        expect(commands)[toMatchSnapshot]()
      })
    })

    describe('count', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(1)

        try {
          await redis[command]('count', 'foo')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }
      })

      it('returns number of commands', async () => {
        expect(await redis[command]('COUNT'))[toMatchSnapshot]()
      })
    })

    describe('list', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(1)

        try {
          await redis[command]('list', 'foo')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }
      })

      it('returns a list of all commands', async () => {
        const commands = await redis[command]('LIST')
        commands.sort()
        expect(commands)[toMatchSnapshot]()
      })
    })

    describe('docs', () => {
      it('returns nothing on an unknown command', async () => {
        const commands = await redis[command]('docs', 'foo')

        expect(commands)[toMatchSnapshot]()
      })

      it('returns all commands by default', async () => {
        const commands = await redis[command]('docs')

        expect(commands).toEqual(expect.any(Array))
      })

      it('returns a commands docs', async () => {
        const commands = await redis[command]('docs', 'get')

        expect(commands)[toMatchSnapshot]()
      })

      it('returns a description of multiple commands', async () => {
        const commands = await redis[command]('docs', 'get', 'foo', 'set')

        expect(commands)[toMatchSnapshot]()
      })
    })

    describe('getkeys', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(3)

        try {
          await redis[command]('GETKEYS', 'foo')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }

        try {
          await redis[command]('GETKEYS', 'foo', 'bar')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }

        try {
          await redis[command]('GETKEYS', 'get')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }
      })

      it('returns the keys used in get', async () => {
        const commands = await redis[command]('getkeys', 'get', 'foo')

        expect(commands)[toMatchSnapshot]()
      })

      it('returns the keys used in sdiff', async () => {
        const commands = await redis[command]('getkeys', 'sdiff', 'foo', 'bar')

        expect(commands)[toMatchSnapshot]()
      })

      it('returns the keys used in hmset', async () => {
        const commands = await redis[command](
          'getkeys',
          'hmset',
          'user:1',
          'id',
          '1',
          'email',
          'bruce@wayne.enterprises'
        )

        expect(commands)[toMatchSnapshot]()
      })
    })

    // TODO: implement this command
    ;(process.env.IS_E2E ? describe : describe.skip)('getkeysandflags', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(3)

        try {
          await redis[command]('GETKEYSANDFLAGS', 'foo')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }

        try {
          await redis[command]('GETKEYSANDFLAGS', 'foo', 'bar')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }

        try {
          await redis[command]('GETKEYSANDFLAGS', 'get')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }
      })

      it('returns the keys used in get', async () => {
        const commands = await redis[command]('getkeysandflags', 'get', 'foo')

        expect(commands)[toMatchSnapshot]()
      })

      it('returns the keys used in sdiff', async () => {
        const commands = await redis[command](
          'getkeysandflags',
          'sdiff',
          'foo',
          'bar'
        )

        expect(commands)[toMatchSnapshot]()
      })

      it('returns the keys used in hmset', async () => {
        const commands = await redis[command](
          'getkeysandflags',
          'hmset',
          'user:1',
          'id',
          '1',
          'email',
          'bruce@wayne.enterprises'
        )

        expect(commands)[toMatchSnapshot]()
      })
    })

    describe('help', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('HELP', 'foo')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }

        try {
          await redis[command]('HELP', 'foo', 'bar')
        } catch (err) {
          expect(err.message)[toMatchSnapshot]()
        }
      })

      it('prints a list over available subcommands', async () => {
        const result = await redis[command]('HELP')

        expect(
          result.map(val => (Buffer.isBuffer(val) ? val.toString() : val))
        )[toMatchSnapshot]()
      })
    })
  })
})

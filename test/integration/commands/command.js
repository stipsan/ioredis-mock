import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('command', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    // TODO works like info, returns everything as if COMMAND INFO *
    it('returns a all commands by default', async () => {
      const commands = await redis[command]()

      expect(commands).toEqual(expect.any(Array))
    })

    it('should throw on unknown subcommand', async () => {
      expect.hasAssertions()

      try {
        await redis[command]('foobar')
      } catch (err) {
        expect(err.message).toMatchInlineSnapshot('Unknown subcommand')
      }
    })

    describe('info', () => {
      it('returns a description of the command', async () => {
        const [get, sinter] = await redis[command]('info', 'get', 'sinter')

        expect(equals(get[0], 'get')).toBe(true)
        expect(get[1]).toBe(2)
        expect(equals(get[2][0], 'readonly')).toBe(true)
        expect(equals(get[2][1], 'fast')).toBe(true)
        expect(get[3]).toBe(1)
        expect(get[4]).toBe(1)
        expect(get[5]).toBe(1)

        expect(equals(sinter[0], 'sinter')).toBe(true)
        expect(sinter[1]).toBe(-2)
        expect(equals(sinter[2][0], 'readonly')).toBe(true)
        expect(equals(sinter[2][1], 'sort_for_script')).toBe(false)
        expect(sinter[3]).toBe(1)
        expect(sinter[4]).toBe(-1)
        expect(sinter[5]).toBe(1)
      })
    })

    describe('count', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.hasAssertions()

        try {
          await redis[command]('count', 'foo')
        } catch (err) {
          expect(err.message).toMatchInlineSnapshot('wrong number of arguments')
        }
      })

      it('returns number of commands', async () => {
        expect(await redis[command]('COUNT')).toBeGreaterThanOrEqual(224)
      })
    })

    describe('help', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('HELP', 'foo')
        } catch (err) {
          expect(err.message).toMatchInlineSnapshot('wrong number of arguments')
        }

        try {
          await redis[command]('HELP', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatchInlineSnapshot('wrong number of arguments')
        }
      })

      it('prints a list over available subcommands', async () => {
        const result = await redis[command]('HELP')

        expect(
          result.map(val => {
            return Buffer.isBuffer(val) ? val.toString() : val
          })
        ).toMatchInlineSnapshot([
          'COMMAND <subcommand> [<arg> [value] [opt] ...]. Subcommands are:',
          '(no subcommand)',
          '    Return details about all Redis commands.',
          'COUNT',
          '    Return the total number of commands in this Redis server.',
          'GETKEYS <full-command>',
          '    Return the keys from a full Redis command.',
          'INFO [<command-name> ...]',
          '    Return details about multiple Redis commands.',
          'HELP',
          '    Prints this help.',
        ])
      })
    })
  })
})

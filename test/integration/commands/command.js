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
    // TODO: update to snapshot testing to ensure consistency
    it.skip('returns a all commands by default', async () => {
      const commands = await redis[command]()

      expect(commands).toMatchSnapshot()
    })

    it('should throw on unknown subcommand', async () => {
      expect.hasAssertions()

      try {
        await redis[command]('foobar')
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })

    describe('info', () => {
      it('returns nothing on an unknown command', async () => {
        const commands = await redis[command]('info', 'foo')
  
        expect(commands).toMatchSnapshot()
      })

      it('returns a all commands by default', async () => {
        const commands = await redis[command]('info')
  
        expect(commands).toEqual(expect.any(Array))
      })

      it('returns a command description', async () => {
        const commands = await redis[command]('info', 'get')
  
        expect(commands).toMatchSnapshot()
      })

      it('returns a description of multiple commands', async () => {
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
        expect.assertions(1)

        try {
          await redis[command]('count', 'foo')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })

      it('returns number of commands', async () => {
        expect(await redis[command]('COUNT')).toMatchSnapshot()
      })
    })

    describe('list', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(1)

        try {
          await redis[command]('list', 'foo')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })

      it('returns a list of all commands', async () => {
        expect(await redis[command]('LIST')).toMatchSnapshot()
      })
    })

    // TODO: implement this command
    describe.skip('docs', () => {
      it('returns nothing on an unknown command', async () => {
        const commands = await redis[command]('docs', 'foo')
  
        expect(commands).toMatchSnapshot()
      })

      it('returns a all commands by default', async () => {
        const commands = await redis[command]('docs')
  
        expect(commands).toEqual(expect.any(Array))
      })

      it('returns a command description', async () => {
        const commands = await redis[command]('docs', 'get')
  
        expect(commands).toMatchSnapshot()
      })

      it('returns a description of multiple commands', async () => {
        const commands = await redis[command]('docs', 'get', 'set')
  
        expect(commands).toMatchSnapshot()
      })
    })

    // TODO: implement this command
    describe.skip('getkeys', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(3)

        try {
          await redis[command]('GETKEYS', 'foo')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }

        try {
          await redis[command]('GETKEYS', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }

        try {
          await redis[command]('GETKEYS', 'get')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })

      it('returns the keys used in get', async () => {
        const commands = await redis[command]('getkeys', 'get', 'foo')
  
        expect(commands).toMatchSnapshot()
      })

      it('returns the keys used in sdiff', async () => {
        const commands = await redis[command]('getkeys', 'sdiff', 'foo', 'bar')
  
        expect(commands).toMatchSnapshot()
      })

      it('returns the keys used in hmset', async () => {
        const commands = await redis[command]('getkeys', 'hmset', 'user:1',
        'id',
        '1',
        'email',
        'bruce@wayne.enterprises')
  
        expect(commands).toMatchSnapshot()
      })
    })

    // TODO: implement this command
    describe.skip('getkeysandflags', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(3)

        try {
          await redis[command]('GETKEYSANDFLAGS', 'foo')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }

        try {
          await redis[command]('GETKEYSANDFLAGS', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }

        try {
          await redis[command]('GETKEYSANDFLAGS', 'get')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })

      it('returns the keys used in get', async () => {
        const commands = await redis[command]('getkeysandflags', 'get', 'foo')
  
        expect(commands).toMatchSnapshot()
      })

      it('returns the keys used in sdiff', async () => {
        const commands = await redis[command]('getkeysandflags', 'sdiff', 'foo', 'bar')
  
        expect(commands).toMatchSnapshot()
      })

      it('returns the keys used in hmset', async () => {
        const commands = await redis[command]('getkeysandflags', 'hmset', 'user:1',
        'id',
        '1',
        'email',
        'bruce@wayne.enterprises')
  
        expect(commands).toMatchSnapshot()
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

        expect(
          result.map(val => {
            return Buffer.isBuffer(val) ? val.toString() : val
          })
        ).toMatchSnapshot()
      })
    })
  })
})

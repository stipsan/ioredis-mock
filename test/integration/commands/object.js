import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('object', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should throw on too few arguments', async () => {
      expect.hasAssertions()
      await expect(() => redis[command]()).rejects.toThrow(
        'wrong number of arguments'
      )
    })

    it('should throw on unknown subcommand', async () => {
      expect.hasAssertions()

      try {
        await redis[command]('foobar')
      } catch (err) {
        expect(err.message).toMatchSnapshot()
      }
    })

    describe('encoding', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('encoding')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }

        try {
          await redis[command]('ENCODING', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatchSnapshot()
        }
      })

      it("returns null on keys that don't exist", async () => {
        expect(await redis[command]('ENCODING', 'foo')).toBe(null)
      })

      it('returns the internal encoding for the Redis object', async () => {
        await redis.set('mystring', 'hello')
        const mystring = await redis[command]('encoding', 'mystring')
        expect(mystring).toMatchSnapshot()

        await redis.set('myint', 1)
        const myint = await redis[command]('encoding', 'myint')
        expect(myint).toMatchSnapshot()

        await redis.rpush('mylist', 'one')
        const mylist = await redis[command]('encoding', 'mylist')
        expect(mylist).toMatchSnapshot()

        await redis.sadd('myintset', 1, 2, 3)
        const myintset = await redis[command]('encoding', 'myintset')
        expect(myintset).toMatchSnapshot()

        await redis.sadd('myset', 'one', 'two', 'three')
        const myset = await redis[command]('encoding', 'myset')
        expect(myset).toMatchSnapshot()

        await redis.hmset('myhash', 'one', 1, 'two', 2)
        const myhash = await redis[command]('encoding', 'myhash')
        expect(myhash).toMatchSnapshot()

        await redis.zadd('mysortedset', 1, 'one', 2, 'two', 3, 'three')
        const mysortedset = await redis[command]('encoding', 'mysortedset')
        expect(mysortedset).toMatchSnapshot()
      })
    })

    describe('freq', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('freq')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }

        try {
          await redis[command]('FREQ', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }
      })

      it("returns null on keys that don't exist", async () => {
        expect(await redis[command]('FREQ', 'foo')).toBe(null)
      })

      it('should throw on no maxmemory policy selected', async () => {
        expect.hasAssertions()
        await redis.set('foo', 'bar')

        try {
          await redis[command]('FREQ', 'foo')
        } catch (err) {
          expect(err.message).toMatch('An LFU maxmemory policy is not selected')
        }
      })
    })

    describe('idletime', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('idletime')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }

        try {
          await redis[command]('IDLETIME', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }
      })

      it("returns null on keys that don't exist", async () => {
        expect(await redis[command]('IDLETIME', 'foo')).toBe(null)
      })

      it('returns the time since last access', async () => {
        await redis.set('foo', 'bar')
        expect(await redis[command]('IDLETIME', 'foo')).toBe(0)

        // @TODO implement this functionality together with the TOUCH command
        if (process.env.IS_E2E) {
          await new Promise(resolve => setTimeout(resolve, 1100))

          expect(await redis[command]('IDLETIME', 'foo')).toBeGreaterThan(0)
        }
      })
    })

    describe('refcount', () => {
      it('should throw on wrong number of arguments', async () => {
        expect.assertions(2)

        try {
          await redis[command]('refcount')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }

        try {
          await redis[command]('REFCOUNT', 'foo', 'bar')
        } catch (err) {
          expect(err.message).toMatch('wrong number of arguments')
        }
      })

      it("returns null on keys that don't exist", async () => {
        expect(await redis[command]('REFCOUNT', 'foo')).toBe(null)
      })

      it('returns 1 on keys that exists', async () => {
        await redis.set('foo', 'bar')
        expect(await redis[command]('REFCOUNT', 'foo')).toBe(1)
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
          result.map(val => (Buffer.isBuffer(val) ? val.toString() : val))
        ).toEqual([
          'OBJECT <subcommand> [<arg> [value] [opt] ...]. Subcommands are:',
          'ENCODING <key>',
          '    Return the kind of internal representation used in order to store the value',
          '    associated with a <key>.',
          'FREQ <key>',
          '    Return the access frequency index of the <key>. The returned integer is',
          '    proportional to the logarithm of the recent access frequency of the key.',
          'IDLETIME <key>',
          '    Return the idle time of the <key>, that is the approximated number of',
          '    seconds elapsed since the last access to the key.',
          'REFCOUNT <key>',
          '    Return the number of references of the value associated with the specified',
          '    <key>.',
          'HELP',
          '    Prints this help.',
        ])
      })
    })
  })
})

import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('eval', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should run simple scripts', async () => {
      const retVal = await redis[command]('return ARGV[1]', 0, 'hello')

      expect(equals(retVal, 'hello')).toBe(true)
    })

    it('should execute a lua script through eval and get the return value', () => {
      const NUMBER_OF_KEYS = 2
      const KEY1 = 'KEY1'
      const KEY2 = 'KEY2'

      return redis
        .set(KEY1, 10)
        .then(() => {
          return redis.set(KEY2, 20)
        })
        .then(() => {
          const luaScript = `
              local rcall = redis.call
              local val1 = rcall("GET", KEYS[1])
              local val2 = rcall("GET", KEYS[2])
              local sum = val1 + val2
              return ((val1 + val2) * ARGV[1]) + ARGV[2]
            `

          return redis[command](
            luaScript,
            NUMBER_OF_KEYS,
            KEY1,
            KEY2,
            100,
            5
          ).then(result => {
            return expect(result).toEqual(3005)
          })
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

        return redis[command](luaScript, NUMBER_OF_KEYS, KEY1).then(result => {
          return expect(equals(result, '10')).toBe(true)
        })
      })
    })

    it('repro: # is off-by-one because arrays are 1-based', async () => {
      const retVal = await redis[command](
        `
        local members = redis.call('SMEMBERS', 'nonexistant')
        return #members
      `,
        0
      )
      expect(retVal).toEqual(0)
    })

    describe('Runtime libraries', () => {
      describe.skip('String Manipulation', () => {})
      describe.skip('Table Manipulation', () => {})
      describe.skip('Mathematical Functions', () => {})

      describe('the struct library', () => {
        it('struct.pack', async () => {
          const retVal = await redis[command]("return struct.pack('HH', 1, 2)" , 0)

          expect(equals(retVal, '\x01\x00\x02\x00')).toBe(true)
        })

        it('struct.unpack', async () => {
          const retVal = await redis[command]("return { struct.unpack('HH', ARGV[1]) }" , 0, '\x01\x00\x02\x00')
    
          expect(retVal).toEqual([1,2,5])
        })

        it('struct.size', async () => {
    
          expect(await redis[command]("return struct.size('HH')" , 0)).toEqual(4)
        })
      })

      describe.only('the cjson library', () => {
        it('cjson.encode', async () => {
          const retVal = await redis[command]("return cjson.encode({ ['foo'] = 'bar' })" , 0)
    
          expect(retVal).toEqual('{"foo":"bar"}')
          expect(equals(retVal,'{"foo":"bar"}')).toBe(true)
        })

        it('cjson.decode', async () => {
          const retVal = await redis[command]("return cjson.decode(ARGV[1])['foo']", 0, '{"foo":"bar"}')
    
          expect(equals(retVal,'bar')).toBe(true)
        })

       
      })

      describe('the cmsgpack library', () => {
        it('cmsgpack.pack', async () => {
          const retVal = await redis[command]("return cmsgpack.pack({'foo', 'bar', 'baz'})", 0)
    
          expect(Buffer.isBuffer(retVal) ? retVal.toString() : retVal).toBe(Buffer.from('\x93\xa3foo\xa3bar\xa3baz', 'binary').toString())
        })

        it('cmsgpack.unpack', async () => {
          const retVal = await redis[command]('return cmsgpack.unpack(ARGV[1])', 0, Buffer.from('\x93\xa3foo\xa3bar\xa3baz', 'binary'))
    
          expect(equals(retVal[0],'foo')).toBe(true)
          expect(equals(retVal[1],'bar')).toBe(true)
          expect(equals(retVal[2],'baz')).toBe(true)
        })

      })

      describe('the bit library', () => {
        it('bit.tobit', async () => {
          const retVal = await redis[command]('return bit.tobit(1)' , 0)
    
          expect(retVal).toEqual(1)
        })

        it('bit.tohex', async () => {
          const retVal = await redis[command]('return bit.tohex(422342)' , 0)
    
          expect(equals(retVal,'000671c6')).toBe(true)
        })

        it('bit.bor', async () => {
          const retVal = await redis[command]('return bit.bor(1,2,4,8,16,32,64,128)' , 0)
    
          expect(retVal).toEqual(255)
        })

      })
      
    })

    
  })
})

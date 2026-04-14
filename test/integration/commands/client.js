import Redis from 'ioredis'

import { runTwinSuite } from '../../../test-utils'

runTwinSuite('client', (command, equals) => {
  describe(command, () => {
    describe('SETNAME', () => {
      it('should return OK when setting name', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('SETNAME', 'myclient'), 'OK')).toBe(
          true
        )
        redis.disconnect()
      })

      it('should overwrite the name when setting again', async () => {
        const redis = new Redis()
        await redis[command]('SETNAME', 'first')
        expect(equals(await redis[command]('SETNAME', 'second'), 'OK')).toBe(
          true
        )
        redis.disconnect()
      })
    })

    describe('GETNAME', () => {
      it('should return null when no name is set', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('GETNAME'), null)).toBe(true)
        redis.disconnect()
      })

      it('should return the name after setting it', async () => {
        const redis = new Redis()
        await redis[command]('SETNAME', 'myclient')
        expect(equals(await redis[command]('GETNAME'), 'myclient')).toBe(true)
        redis.disconnect()
      })
    })

    describe('ID', () => {
      it('should return a positive integer', async () => {
        const redis = new Redis()
        const id = await redis[command]('ID')
        expect(typeof id).toBe('number')
        expect(id).toBeGreaterThan(0)
        redis.disconnect()
      })
    })

    describe('INFO', () => {
      it('should return client info string', async () => {
        const redis = new Redis()
        const info = await redis[command]('INFO')
        if (command === 'clientBuffer') {
          expect(Buffer.isBuffer(info)).toBe(true)
        } else {
          expect(typeof info).toBe('string')
          expect(info).toContain('id=')
        }
        redis.disconnect()
      })
    })

    describe('LIST', () => {
      it('should return client list string', async () => {
        const redis = new Redis()
        const list = await redis[command]('LIST')
        if (command === 'clientBuffer') {
          expect(Buffer.isBuffer(list)).toBe(true)
        } else {
          expect(typeof list).toBe('string')
          expect(list).toContain('id=')
        }
        redis.disconnect()
      })
    })

    describe('PAUSE', () => {
      it('should return OK', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('PAUSE', 1000), 'OK')).toBe(true)
        redis.disconnect()
      })
    })

    describe('UNPAUSE', () => {
      it('should return OK', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('UNPAUSE'), 'OK')).toBe(true)
        redis.disconnect()
      })
    })

    describe('HELP', () => {
      it('should return help text', async () => {
        const redis = new Redis()
        const help = await redis[command]('HELP')
        expect(Array.isArray(help)).toBe(true)
        expect(help.length).toBeGreaterThan(0)
        const firstHelp =
          command === 'clientBuffer' ? help[0].toString() : help[0]
        expect(firstHelp).toContain('CLIENT')
        redis.disconnect()
      })
    })

    describe('SETINFO', () => {
      it('should return OK for LIB-NAME', async () => {
        const redis = new Redis()
        expect(
          equals(await redis[command]('SETINFO', 'LIB-NAME', 'ioredis'), 'OK')
        ).toBe(true)
        redis.disconnect()
      })

      it('should return OK for LIB-VER', async () => {
        const redis = new Redis()
        expect(
          equals(await redis[command]('SETINFO', 'LIB-VER', '4.28.3'), 'OK')
        ).toBe(true)
        redis.disconnect()
      })
    })

    describe('CACHING', () => {
      it('should return OK for YES', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('CACHING', 'YES'), 'OK')).toBe(true)
        redis.disconnect()
      })

      it('should return OK for NO', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('CACHING', 'NO'), 'OK')).toBe(true)
        redis.disconnect()
      })
    })

    describe('TRACKING', () => {
      it('should return OK for ON', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('TRACKING', 'ON'), 'OK')).toBe(true)
        redis.disconnect()
      })

      it('should return OK for OFF', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('TRACKING', 'OFF'), 'OK')).toBe(true)
        redis.disconnect()
      })
    })

    describe('TRACKINGINFO', () => {
      it('should return tracking info', async () => {
        const redis = new Redis()
        const info = await redis[command]('TRACKINGINFO')
        expect(Array.isArray(info)).toBe(true)
        expect(info.length).toBeGreaterThan(0)
        redis.disconnect()
      })
    })

    describe('NO-EVICT', () => {
      it('should return OK for ON', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('NO-EVICT', 'ON'), 'OK')).toBe(true)
        redis.disconnect()
      })

      it('should return OK for OFF', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('NO-EVICT', 'OFF'), 'OK')).toBe(true)
        redis.disconnect()
      })
    })

    describe('NO-TOUCH', () => {
      it('should return OK for ON', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('NO-TOUCH', 'ON'), 'OK')).toBe(true)
        redis.disconnect()
      })

      it('should return OK for OFF', async () => {
        const redis = new Redis()
        expect(equals(await redis[command]('NO-TOUCH', 'OFF'), 'OK')).toBe(true)
        redis.disconnect()
      })
    })

    it('should throw on unknown subcommand', async () => {
      const redis = new Redis()
      await expect(redis[command]('UNKNOWN')).rejects.toThrow()
      redis.disconnect()
    })
  })
})

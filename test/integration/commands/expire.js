import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('expire', command => {
  describe(command, () => {
    const redis = new Redis()

    afterAll(() => {
      redis.disconnect()
    })

    it('should delete key on get', async () => {
      await redis.set('foo', 'bar')

      const status = await redis[command]('foo', 1)
      const beforeExpire = await redis.get('foo')

      await new Promise(resolve => {
        return setTimeout(resolve, 1500)
      })
      const afterExpire = await redis.get('foo')

      expect(status).toBe(1)
      expect(beforeExpire).toBe('bar')
      expect(afterExpire).toBe(null)
    })

    it('should delete key on garbage collect', async () => {
      await redis.set('foo', 'bar')

      await redis[command]('foo', 0)

      expect(await redis.get('foo')).toBe(null)
    })

    it('should return 0 if key does not exist', () => {
      return redis[command]('foo', 1).then(status => {
        return expect(status).toBe(0)
      })
    })

    it('should remove expire on SET', async () => {
      await redis.set('foo', 'bar')

      await redis[command]('foo', 1)
      await redis.set('foo', 'baz')

      expect(await redis.ttl('foo')).toBe(-1)
    })

    it('should remove expire on GETSET', async () => {
      await redis.set('foo', 'bar')

      await redis[command]('foo', 1)
      await redis.getset('foo', 'baz')

      expect(await redis.ttl('foo')).toBe(-1)
    })

    it('should move expire on RENAME', async () => {
      await redis.set('foo', 'bar')

      await redis[command]('foo', 1)
      await redis.rename('foo', 'baz')
      expect(await redis.ttl('baz')).toBe(1)
    })
    ;(process.env.IS_E2E ? it.skip : it)(
      'should emit keyspace notification if configured',
      done => {
        const redis1 = new Redis({ notifyKeyspaceEvents: 'gK' }) // gK: generic Keyspace
        const redisPubSub = redis1.duplicate()
        redisPubSub.on('message', (channel, message) => {
          expect(channel).toBe('__keyspace@0__:foo')
          expect(message).toBe('expire')
          done()
        })
        redisPubSub.subscribe('__keyspace@0__:foo').then(() => {
          return redis1.set('foo', 'value').then(() => {
            return redis1[command]('foo', 1)
          })
        })
      }
    )
  })
})

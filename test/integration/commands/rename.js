import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('rename', (command, equals) => {
  describe(command, () => {
    it('should rename a key to newkey', async () => {
      const redis = new Redis()
      await redis.set('foo', 'baz')

      const status = await redis[command]('foo', 'bar')
      expect(equals(status, 'OK')).toBe(true)
      expect(await redis.get('foo')).toBe(null)
      expect(await redis.get('bar')).toBe('baz')

      redis.disconnect()
    })
    ;(process.env.IS_E2E ? it.skip : it)(
      'should emit keyspace notifications if configured',
      done => {
        const redis = new Redis({ notifyKeyspaceEvents: 'gK' }) // gK: generic Keyspace
        const redisPubSub = redis.duplicate()
        let messagesReceived = 0
        redisPubSub.on('message', (channel, message) => {
          messagesReceived++
          if (messagesReceived === 1) {
            expect(channel).toBe('__keyspace@0__:before')
            expect(message).toBe('rename_from')
          }
          if (messagesReceived === 2) {
            expect(channel).toBe('__keyspace@0__:after')
            expect(message).toBe('rename_to')

            redis.disconnect()
            redisPubSub.disconnect()
            done()
          }
        })
        redisPubSub
          .subscribe('__keyspace@0__:before', '__keyspace@0__:after')
          .then(async () => {
            return redis.set('before', 'value').then(() => {
              return redis.rename('before', 'after')
            })
          })
      }
    )
    /*
    if( process.env.IS_E2E) {
      // Skipped in E2E as the `notifyKeyspaceEvents` option only exists in ioredis-mock
      it.skip(testDesc, testFn)
    } else {
      it(testDesc, testFn)
    }
    // */
  })
})

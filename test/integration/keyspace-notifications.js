import Redis from 'ioredis'

// This is a mock-only feature
// eslint-disable-next-line import/newline-after-import
;(process.env.IS_E2E ? describe.skip : describe)('notifyKeyspaceEvents', () => {
  describe('keyspaceNotifications', () => {
    it('should appear when configured and the triggering event occurs', done => {
      const redis = new Redis({ notifyKeyspaceEvents: 'gK' }) // gK: generic keyspace
      const redisPubSub = redis.duplicate()
      redisPubSub.on('message', (channel, message) => {
        expect(channel).toBe('__keyspace@0__:key')
        expect(message).toBe('del')
        done()
      })
      redisPubSub
        .subscribe('__keyspace@0__:key')
        .then(() => redis.set('key', 'value').then(() => redis.del('key')))
    })

    it('should not appear when not configured and the triggering event occurs', done => {
      const redis = new Redis({ notifyKeyspaceEvents: '' }) // empty string: not configured
      redis.on('message', (channel, message) => {
        throw new Error(`should not receive ${message} on ${channel}`)
      })
      redis.set('key', 'value').then(() => redis.del('key'))
      // wait for notification to NOT appear
      setTimeout(() => done(), 40)
    })

    it('should appear on a connected second mock instance when configured and the triggering event occurs', done => {
      const redis = new Redis({ notifyKeyspaceEvents: 'gK' }) // gK: generic keyspace
      const redis2 = new Redis({ notifyKeyspaceEvents: 'gK' })
      redis2.on('message', (channel, message) => {
        expect(channel).toBe('__keyspace@0__:key')
        expect(message).toBe('del')
        done()
      })
      redis2
        .subscribe('__keyspace@0__:key')
        .then(() => redis.set('key', 'value').then(() => redis.del('key')))
    })
  })

  describe('keyeventNotifications', () => {
    it('should appear when configured and the triggering event occurs', done => {
      const redis = new Redis({ notifyKeyspaceEvents: 'gE' }) // gK: generic keyevent
      const redisPubSub = redis.duplicate()
      redisPubSub.on('message', (channel, message) => {
        expect(channel).toBe('__keyevent@0__:del')
        expect(message).toBe('key')
        done()
      })
      redisPubSub
        .subscribe('__keyevent@0__:del')
        .then(() => redis.set('key', 'value').then(() => redis.del('key')))
    })
  })
})

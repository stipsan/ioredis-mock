import Redis from 'ioredis'

describe('keyspaceNotifications', () => {
  it('should appear when configured and the triggering event occurs', done => {
    const redis = new Redis({ notifyKeyspaceEvents: 'gK' }) // gK: generic keyspace
    const redisPubSub = redis.duplicate()
    redisPubSub.on('message', (channel, message) => {
      expect(channel).toBe('__keyspace@0__:key')
      expect(message).toBe('del')
      done()
    })
    redisPubSub.subscribe('__keyspace@0__:key').then(() => {
      return redis.set('key', 'value').then(() => {
        return redis.del('key')
      })
    })
  })

  it('should not appear when not configured and the triggering event occurs', done => {
    const redis = new Redis({ notifyKeyspaceEvents: '' }) // empty string: not configured
    redis.on('message', (channel, message) => {
      throw new Error(`should not receive ${message} on ${channel}`)
    })
    redis.set('key', 'value').then(() => {
      return redis.del('key')
    })
    // wait for notification to NOT appear
    setTimeout(() => {
      return done()
    }, 40)
  })

  it('should appear on a connected second mock instance when configured and the triggering event occurs', done => {
    const redis = new Redis({ notifyKeyspaceEvents: 'gK' }) // gK: generic keyspace
    const redis2 = redis.createConnectedClient({ notifyKeyspaceEvents: 'gK' })
    redis2.on('message', (channel, message) => {
      expect(channel).toBe('__keyspace@0__:key')
      expect(message).toBe('del')
      done()
    })
    redis2.subscribe('__keyspace@0__:key').then(() => {
      return redis.set('key', 'value').then(() => {
        return redis.del('key')
      })
    })
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
    redisPubSub.subscribe('__keyevent@0__:del').then(() => {
      return redis.set('key', 'value').then(() => {
        return redis.del('key')
      })
    })
  })
})

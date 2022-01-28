import Redis from 'ioredis'

describe('rename', () => {
  it('should rename a key to newkey', () => {
    const redis = new Redis({
      data: {
        foo: 'baz',
      },
    })
    return redis
      .rename('foo', 'bar')
      .then(status => {
        return expect(status).toBe('OK')
      })
      .then(() => {
        expect(redis.data.has('foo')).toBe(false)
        expect(redis.data.get('bar')).toBe('baz')
      })
  })

  it('should emit keyspace notifications if configured', done => {
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
        done()
      }
    })
    redisPubSub
      .subscribe('__keyspace@0__:before', '__keyspace@0__:after')
      .then(() => {
        return redis.set('before', 'value').then(() => {
          return redis.rename('before', 'after')
        })
      })
  })
})

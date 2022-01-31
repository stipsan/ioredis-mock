import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('publish', command => {
  describe(command, () => {
    it('should return 0 when publishing without subscribers', () => {
      const redis = new Redis()
      return redis[command]('emails', 'clark@daily.planet').then(
        subscribers => {
          return expect(subscribers).toBe(0)
        }
      )
    })

    it('should return 1 when publishing with a single subscriber', () => {
      const redisPubSub = new Redis()
      const redis2 = new Redis()
      redisPubSub.subscribe('emails')
      return redis2[command]('emails', 'clark@daily.planet')
        .then(subscribers => {
          return expect(subscribers).toBe(1)
        })
        .finally(() => {
          return redisPubSub.unsubscribe('emails')
        })
    })

    it('should publish a message, which can be received by a previous subscribe', done => {
      const redisPubSub = new Redis()
      const redis2 = new Redis()
      redisPubSub.on('message', (channel, message) => {
        expect(channel).toBe('emails')
        expect(message).toBe('clark@daily.planet')
        redisPubSub.unsubscribe('emails')
        done()
      })
      redisPubSub.subscribe('emails')
      redis2[command]('emails', 'clark@daily.planet')
    })

    it('should emit messageBuffer event when a Buffer message is published on a subscribed channel', done => {
      const redisPubSub = new Redis()
      const redis2 = new Redis()
      const buffer = Buffer.alloc(8)
      redisPubSub.on('messageBuffer', (channel, message) => {
        expect(channel).toBe('emails')
        expect(message).toBe(buffer)
        redisPubSub.unsubscribe('emails')
        done()
      })
      redisPubSub.subscribe('emails')
      redis2[command]('emails', buffer)
    })

    it('should return 1 when publishing with a single pattern subscriber', () => {
      const redisPubSub = new Redis()
      const redis2 = new Redis()
      redisPubSub.psubscribe('emails.*')
      return redis2[command]('emails.urgent', 'clark@daily.planet')
        .then(subscribers => {
          return expect(subscribers).toBe(1)
        })
        .finally(() => {
          return redisPubSub.punsubscribe('emails.*')
        })
    })

    it('should publish a message, which can be received by a previous psubscribe', done => {
      const redisPubSub = new Redis()
      const redis2 = new Redis()
      redisPubSub.on('pmessage', (pattern, channel, message) => {
        expect(pattern).toBe('emails.*')
        expect(channel).toBe('emails.urgent')
        expect(message).toBe('clark@daily.planet')
        redisPubSub.punsubscribe('emails.*')
        done()
      })
      redisPubSub.psubscribe('emails.*')
      redis2[command]('emails.urgent', 'clark@daily.planet')
    })

    it('should emit a pmessageBuffer event when a Buffer message is published matching a psubscribed pattern', done => {
      const redisPubSub = new Redis()
      const redis2 = new Redis()
      const buffer = Buffer.alloc(0)
      redisPubSub.on('pmessageBuffer', (pattern, channel, message) => {
        expect(pattern).toBe('emails.*')
        expect(channel).toBe('emails.urgent')
        expect(message).toBe(buffer)
        redisPubSub.punsubscribe('emails.*')
        done()
      })
      redisPubSub.psubscribe('emails.*')
      redis2[command]('emails.urgent', buffer)
    })
  })
})

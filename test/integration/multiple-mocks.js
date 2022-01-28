import Redis from 'ioredis'

describe('multipleMocks', () => {
  it('should be possible to create a second IORedis client, which is working on shared data with the first client', () => {
    const client1 = new Redis()
    const client2 = new Redis()
    client1.hset('testing', 'test', '2').then(() => {
      client2.hget('testing', 'test').then(val => {
        return expect(val).toBe('2')
      })
    })
  })

  it('should be possible to create a second IORedis client, which is working on shared channels with the first client', done => {
    const client1 = new Redis()
    const client2 = new Redis()
    client1.on('message', (channel, message) => {
      expect(channel).toBe('channel')
      expect(message).toBe('hello')
      done()
    })
    client1.subscribe('channel')
    client2.publish('channel', 'hello')
  })

  describe('when closing a second, shared IORedis client', () => {
    it('should clean up opened subscriptions', () => {
      const client = new Redis()

      const testChannel = 'hello'
      const numberOfListeners = () => {
        return client.channels.instanceListeners.get(testChannel).size
      }

      const connectedClients = []
      for (let i = 0; i < 10; i++) {
        const connectedClient = client.duplicate()
        connectedClients.push(connectedClient)
        connectedClient.subscribe(testChannel)
      }

      expect(numberOfListeners()).toBe(10)

      for (let i = 0; i < 5; i++) {
        connectedClients[i].quit()
      }

      expect(numberOfListeners()).toBe(5)
    })
  })
})

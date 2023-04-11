import Redis from 'ioredis'

describe('multipleMocks', () => {
  it('should be possible to create a second IORedis client, which is working on shared data with the first client', async () => {
    expect.assertions(1)
    const client1 = new Redis()
    const client2 = new Redis()
    await client1.hset('testing', 'test', '2')
    let val = await client2.hget('testing', 'test')
    if (val === null) {
      // Retry, when testing on real redis there is a slight delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      val = await client2.hget('testing', 'test')
    }
    expect(val).toBe('2')
  })

  // @TODO Rewrite test so it runs on a real Redis instance
  ;(process.env.IS_E2E ? it.skip : it)(
    'should be possible to create a second IORedis client, which is working on shared channels with the first client',
    done => {
      const client1 = new Redis()
      const client2 = new Redis()
      client1.on('message', (channel, message) => {
        expect(channel).toBe('channel')
        expect(message).toBe('hello')
        done()
      })
      client1.subscribe('channel')
      client2.publish('channel', 'hello')
    }
  )

  describe('when closing a second, shared IORedis client', () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should clean up opened subscriptions',
      () => {
        const client = new Redis()

        const testChannel = 'hello'
        const numberOfListeners = () =>
          client.channels.instanceListeners.get(testChannel).size

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
      }
    )
  })
})

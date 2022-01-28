import Redis from 'ioredis'

describe('constructor options', () => {
  it('new Redis()', async () => {
    const client1 = new Redis({ host: 'localhost', port: '6379' })
    const client2 = new Redis()
    const client3 = new Redis({ keyPrefix: 'private:' })

    await client1.set('foo', 'bar')

    expect(await client1.get('foo')).toBe(await client2.get('foo'))
    expect(await client1.get('foo')).not.toBe(await client3.get('foo'))

    client1.disconnect()
    client2.disconnect()
    client3.disconnect()
  })

  it('new Redis(port, host, options)', async () => {
    const client1 = new Redis({ keyPrefix: 'shared:' })
    const client2 = new Redis(6379, 'localhost', { keyPrefix: 'shared:' })
    const client3 = new Redis({ keyPrefix: 'private:' })

    await client1.set('foo', 'bar')

    expect(await client1.get('foo')).toBe(await client2.get('foo'))
    expect(await client1.get('foo')).not.toBe(await client3.get('foo'))

    client1.disconnect()
    client2.disconnect()
    client3.disconnect()
  })

  it('new Redis(url, options)', async () => {
    const client1 = new Redis({ keyPrefix: 'shared:' })
    const client2 = new Redis('//localhost:6379', { keyPrefix: 'shared:' })
    const client3 = new Redis('redis://localhost:6379', {
      keyPrefix: 'private:',
    })

    await client1.set('foo', 'bar')

    expect(await client1.get('foo')).toBe(await client2.get('foo'))
    expect(await client1.get('foo')).not.toBe(await client3.get('foo'))

    client1.disconnect()
    client2.disconnect()
    client3.disconnect()
  })

  it('new Redis(port, options)', async () => {
    const client1 = new Redis({ keyPrefix: 'shared:' })
    const client2 = new Redis(6379, { keyPrefix: 'shared:' })
    const client3 = new Redis({ keyPrefix: 'private:' })

    await client1.set('foo', 'bar')

    expect(await client1.get('foo')).toBe(await client2.get('foo'))
    expect(await client1.get('foo')).not.toBe(await client3.get('foo'))

    client1.disconnect()
    client2.disconnect()
    client3.disconnect()
  })

  it('new Redis(port, host, options)', async () => {
    const client1 = new Redis({ keyPrefix: 'shared:' })
    const client2 = new Redis(6379, 'localhost', { keyPrefix: 'shared:' })
    const client3 = new Redis({ keyPrefix: 'private:' })

    await client1.set('foo', 'bar')

    expect(await client1.get('foo')).toBe(await client2.get('foo'))
    expect(await client1.get('foo')).not.toBe(await client3.get('foo'))

    client1.disconnect()
    client2.disconnect()
    client3.disconnect()
  })

  it('new Redis(options)', async () => {
    const client1 = new Redis({ keyPrefix: 'shared:' })
    const client2 = new Redis({
      host: 'localhost',
      port: 6379,
      keyPrefix: 'shared:',
    })
    const client3 = new Redis({ keyPrefix: 'private:' })

    await client1.set('foo', 'bar')

    expect(await client1.get('foo')).toBe(await client2.get('foo'))
    expect(await client1.get('foo')).not.toBe(await client3.get('foo'))

    client1.disconnect()
    client2.disconnect()
    client3.disconnect()
  })

  it('new Redis(port)', async () => {
    const client1 = new Redis()
    const client2 = new Redis(6379)
    const client3 = new Redis({ keyPrefix: 'private:' })

    await client1.set('foo', 'bar')

    expect(await client1.get('foo')).toBe(await client2.get('foo'))
    expect(await client1.get('foo')).not.toBe(await client3.get('foo'))

    client1.disconnect()
    client2.disconnect()
    client3.disconnect()
  })

  it('new Redis(url)', async () => {
    const client1 = new Redis()
    const client2 = new Redis('redis://localhost:6379/')
    const client3 = new Redis({ keyPrefix: 'private:' })

    await client1.set('foo', 'bar')

    expect(await client1.get('foo')).toBe(await client2.get('foo'))
    expect(await client1.get('foo')).not.toBe(await client3.get('foo'))

    client1.disconnect()
    client2.disconnect()
    client3.disconnect()
  })
})

import Redis from 'ioredis'

describe('debug enableOfflineQueue implementation', () => {
  async function testPing(client, label) {
    try {
      const result = await client.ping()
      console.log(`${label}: SUCCESS - ${result}`)
      return 'SUCCESS'
    } catch (e) {
      console.log(`${label}: ERROR - ${e.message}`)
      return 'ERROR'
    }
  }

  it('should test enableOfflineQueue behavior in detail', async () => {
    console.log('=== Testing enableOfflineQueue Implementation ===')
    console.log('IS_E2E:', process.env.IS_E2E)

    // Test 1: Default constructor (should have enableOfflineQueue: true by default)
    console.log('\n1. Default constructor:')
    const redis1 = new Redis()
    console.log(
      'Options:',
      JSON.stringify({
        lazyConnect: redis1.options.lazyConnect,
        enableOfflineQueue: redis1.options.enableOfflineQueue,
        connected: redis1.connected,
      })
    )
    await testPing(redis1, 'Before disconnect')
    redis1.disconnect()
    console.log('After disconnect - connected:', redis1.connected)
    await testPing(redis1, 'After disconnect')

    // Test 2: lazyConnect: true, default enableOfflineQueue
    console.log('\n2. lazyConnect: true, default enableOfflineQueue:')
    const redis2 = new Redis({ lazyConnect: true })
    console.log(
      'Options:',
      JSON.stringify({
        lazyConnect: redis2.options.lazyConnect,
        enableOfflineQueue: redis2.options.enableOfflineQueue,
        connected: redis2.connected,
      })
    )
    await testPing(redis2, 'Never connected')
    redis2.disconnect()

    // Test 3: lazyConnect: true, enableOfflineQueue: true
    console.log('\n3. lazyConnect: true, enableOfflineQueue: true:')
    const redis3 = new Redis({ lazyConnect: true, enableOfflineQueue: true })
    console.log(
      'Options:',
      JSON.stringify({
        lazyConnect: redis3.options.lazyConnect,
        enableOfflineQueue: redis3.options.enableOfflineQueue,
        connected: redis3.connected,
      })
    )
    await testPing(redis3, 'Never connected with explicit true')
    redis3.disconnect()

    // Test 4: lazyConnect: true, enableOfflineQueue: false
    console.log('\n4. lazyConnect: true, enableOfflineQueue: false:')
    const redis4 = new Redis({ lazyConnect: true, enableOfflineQueue: false })
    console.log(
      'Options:',
      JSON.stringify({
        lazyConnect: redis4.options.lazyConnect,
        enableOfflineQueue: redis4.options.enableOfflineQueue,
        connected: redis4.connected,
      })
    )
    await testPing(redis4, 'Never connected with explicit false')
    redis4.disconnect()

    expect(true).toBe(true) // Just to make it a valid test
  }, 15000)
})

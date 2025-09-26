import Redis from 'ioredis'

describe('lpop with count argument - exploration', () => {
  it('should show current behavior when count is provided', async () => {
    const redis = new Redis({
      data: {
        mylist: ['1', '2', '3', '4', '5']
      }
    })

    console.log('Initial list:', redis.data.get('mylist'))
    
    // Test lpop without count
    const singleResult = await redis.lpop('mylist')
    console.log('lpop without count:', singleResult)
    console.log('List after lpop():', redis.data.get('mylist'))
    
    // Reset list
    redis.data.set('mylist', ['1', '2', '3', '4', '5'])
    
    // Test lpop with count
    try {
      const multiResult = await redis.lpop('mylist', 3)
      console.log('lpop with count 3:', multiResult)
      console.log('List after lpop(key, 3):', redis.data.get('mylist'))
    } catch (err) {
      console.log('Error with lpop(key, 3):', err.message)
    }
  })
})
import Redis from 'ioredis'

describe('connect', () => {
  it('should throw if redis has already connected in ctor', async () => {
    // no option specified means {lazyConnect: false}
    const redis = new Redis()

    await new Promise(resolve => {
      setTimeout(resolve, 20)
    })

    try {
      await redis.connect()
      throw new Error('connect should not have succeeded')
    } catch (error) {
      expect(error.message).toBe('Redis is already connecting/connected')
    } finally {
      redis.disconnect()
    }
  })

  it('should signal successful connection', async () => {
    const redis = new Redis({ lazyConnect: true })

    await new Promise(resolve => {
      setTimeout(resolve, 20)
    })

    try {
      expect(await redis.connect()).toBe(undefined)
    } catch (error) {
      expect(error).toBeFalsy()
    } finally {
      redis.disconnect()
    }
  })

  it('should throw if manually connected before', async () => {
    const redis = new Redis({ lazyConnect: true })

    expect(await redis.connect()).toBe(undefined)
    try {
      await redis.connect()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    } finally {
      redis.disconnect()
    }
  })

  it('should throw if executing any command when not connected', async () => {
    const redis = new Redis({ lazyConnect: true, enableOfflineQueue: false })

    try {
      await redis.get('key')
      throw new Error('get shall not succeed when redis is not connected')
    } catch (error) {
      expect(error.message).toBe(
        "Stream isn't writeable and enableOfflineQueue options is false"
      )
    } finally {
      redis.disconnect()
    }
  })
})

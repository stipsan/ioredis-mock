import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('copy', (command, equals) => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    it('should copy a key to a new key and return 1', async () => {
      await redis.set('source', 'value')
      const result = await redis[command]('source', 'destination')
      expect(result).toBe(1)
      expect(await redis.get('source')).toBe('value')
      expect(await redis.get('destination')).toBe('value')
    })

    it('should return 0 if source key does not exist', async () => {
      await redis.del('nonexistent')
      const result = await redis[command]('nonexistent', 'destination')
      expect(result).toBe(0)
      expect(await redis.get('destination')).toBe(null)
    })

    it('should return 0 if destination key exists and REPLACE not specified', async () => {
      await redis.set('source', 'sourcevalue')
      await redis.set('destination', 'destvalue')
      const result = await redis[command]('source', 'destination')
      expect(result).toBe(0)
      expect(await redis.get('destination')).toBe('destvalue')
    })

    it('should replace destination key when REPLACE option is specified', async () => {
      await redis.set('source', 'sourcevalue')
      await redis.set('destination', 'destvalue')
      const result = await redis[command]('source', 'destination', 'REPLACE')
      expect(result).toBe(1)
      expect(await redis.get('destination')).toBe('sourcevalue')
    })

    it('should copy TTL along with the value', async () => {
      await redis.set('source', 'value', 'EX', '10')
      const result = await redis[command]('source', 'destination')
      expect(result).toBe(1)
      const sourceTtl = await redis.ttl('source')
      const destTtl = await redis.ttl('destination')
      expect(destTtl).toBeGreaterThan(0)
      expect(destTtl).toBeLessThanOrEqual(sourceTtl)
    })

    it('should work with different data types - lists', async () => {
      await redis.lpush('sourcelist', 'a', 'b', 'c')
      const result = await redis[command]('sourcelist', 'destlist')
      expect(result).toBe(1)
      const sourceList = await redis.lrange('sourcelist', 0, -1)
      const destList = await redis.lrange('destlist', 0, -1)
      expect(destList).toEqual(sourceList)
    })

    it('should work with different data types - sets', async () => {
      await redis.sadd('sourceset', 'a', 'b', 'c')
      const result = await redis[command]('sourceset', 'destset')
      expect(result).toBe(1)
      const sourceSet = await redis.smembers('sourceset')
      const destSet = await redis.smembers('destset')
      expect(destSet.sort()).toEqual(sourceSet.sort())
    })

    it('should work with different data types - hashes', async () => {
      await redis.hset('sourcehash', 'field1', 'value1', 'field2', 'value2')
      const result = await redis[command]('sourcehash', 'desthash')
      expect(result).toBe(1)
      const sourceHash = await redis.hgetall('sourcehash')
      const destHash = await redis.hgetall('desthash')
      expect(destHash).toEqual(sourceHash)
    })

    it('should work with different data types - sorted sets', async () => {
      await redis.zadd('sourcezset', 1, 'a', 2, 'b', 3, 'c')
      const result = await redis[command]('sourcezset', 'destzset')
      expect(result).toBe(1)
      const sourceZset = await redis.zrange('sourcezset', 0, -1, 'WITHSCORES')
      const destZset = await redis.zrange('destzset', 0, -1, 'WITHSCORES')
      expect(destZset).toEqual(sourceZset)
    })

    it('should handle same source and destination without REPLACE', async () => {
      await redis.set('samekey', 'value')
      const result = await redis[command]('samekey', 'samekey')
      expect(result).toBe(0)
      expect(await redis.get('samekey')).toBe('value')
    })

    it('should handle same source and destination with REPLACE', async () => {
      await redis.set('samekey', 'value')
      const result = await redis[command]('samekey', 'samekey', 'REPLACE')
      expect(result).toBe(1)
      expect(await redis.get('samekey')).toBe('value')
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should emit keyspace notifications if configured',
      done => {
        const redis = new Redis({ notifyKeyspaceEvents: 'gK' }) // gK: generic Keyspace
        const redisPubSub = redis.duplicate()
        let messagesReceived = 0
        redisPubSub.on('message', (channel, message) => {
          messagesReceived++
          expect(channel).toBe('__keyspace@0__:dest')
          expect(message).toBe('copy_to')

          redis.disconnect()
          redisPubSub.disconnect()
          done()
        })
        redisPubSub
          .subscribe('__keyspace@0__:dest')
          .then(async () => {
            await redis.set('source', 'value')
            return redis.copy('source', 'dest')
          })
      }
    )

    it('should work with Buffer variant', async () => {
      await redis.set('source', 'value')
      const result = await redis.copyBuffer('source', 'destination')
      expect(result).toBe(1) // copy returns integer, not buffer
      expect(await redis.get('destination')).toBe('value')
    })
  })
})
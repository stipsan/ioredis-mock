import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lmove', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })

    const listId1 = 'LIST1'
    const listId2 = 'LIST2'
    const emptyList = 'EMPTY'
    const notalist = 'NOTALIST'

    beforeEach(async () => {
      await redis.del(listId1)
      await redis.del(listId2)
      await redis.del(notalist)

      await redis.lpush(emptyList, 'TEST')
      await redis.lpop(emptyList)
      const membersEmpty = await redis.lrange(listId1, 0, -1)
      expect(membersEmpty).toEqual([])

      await redis.lpush(listId1, ['two', 'one'])
      await redis.lpush(listId2, ['four', 'three'])
      await redis.set(notalist, 'TEST')
      const members1 = await redis.lrange(listId1, 0, -1)
      const members2 = await redis.lrange(listId2, 0, -1)
      expect(members1).toEqual(['one', 'two'])
      expect(members2).toEqual(['three', 'four'])
    })

    it('should move the value from LEFT of list1 to LEFT of list2', async () => {
      const result = await redis[command](listId1, listId2, 'LEFT', 'LEFT')
      expect(Buffer.isBuffer(result) ? result.toString() : result).toEqual(
        'one'
      )

      const current1 = await redis.lrange(listId1, 0, -1)
      const current2 = await redis.lrange(listId2, 0, -1)
      expect(current1).toEqual(['two'])
      expect(current2).toEqual(['one', 'three', 'four'])
    })

    it('should move the value from RIGHT of list1 to LEFT of list2', async () => {
      const result = await redis[command](listId1, listId2, 'RIGHT', 'LEFT')
      expect(Buffer.isBuffer(result) ? result.toString() : result).toEqual(
        'two'
      )

      const current1 = await redis.lrange(listId1, 0, -1)
      const current2 = await redis.lrange(listId2, 0, -1)
      expect(current1).toEqual(['one'])
      expect(current2).toEqual(['two', 'three', 'four'])
    })

    it('should move the value from LEFT of list1 to RIGHT of list2', async () => {
      const result = await redis[command](listId1, listId2, 'LEFT', 'RIGHT')
      expect(Buffer.isBuffer(result) ? result.toString() : result).toEqual(
        'one'
      )

      const current1 = await redis.lrange(listId1, 0, -1)
      const current2 = await redis.lrange(listId2, 0, -1)
      expect(current1).toEqual(['two'])
      expect(current2).toEqual(['three', 'four', 'one'])
    })

    it('should move the value from RIGHT of list1 to RIGHT of list2', async () => {
      const result = await redis[command](listId1, listId2, 'RIGHT', 'RIGHT')
      expect(Buffer.isBuffer(result) ? result.toString() : result).toEqual(
        'two'
      )

      const current1 = await redis.lrange(listId1, 0, -1)
      const current2 = await redis.lrange(listId2, 0, -1)
      expect(current1).toEqual(['one'])
      expect(current2).toEqual(['three', 'four', 'two'])
    })

    it('should rotate the list if the source and destination are the same', async () => {
      const result = await redis[command](listId2, listId2, 'LEFT', 'RIGHT')
      expect(Buffer.isBuffer(result) ? result.toString() : result).toEqual(
        'three'
      )

      const current1 = await redis.lrange(listId1, 0, -1)
      const current2 = await redis.lrange(listId2, 0, -1)
      expect(current1).toEqual(['one', 'two'])
      expect(current2).toEqual(['four', 'three'])
    })

    it('should perform no operation if the source is an empty list', async () => {
      const result = await redis[command](emptyList, listId2, 'LEFT', 'LEFT')
      expect(result).toEqual(null)

      const current1 = await redis.lrange(listId1, 0, -1)
      const current2 = await redis.lrange(listId2, 0, -1)
      expect(
        current1.map(v => (Buffer.isBuffer(v) ? v.toString() : v))
      ).toEqual(['one', 'two'])
      expect(
        current2.map(v => (Buffer.isBuffer(v) ? v.toString() : v))
      ).toEqual(['three', 'four'])
    })

    it('should perform no operation if the source and destination are the same and both positions are LEFT', async () => {
      const result = await redis[command](listId2, listId2, 'LEFT', 'LEFT')
      expect(Buffer.isBuffer(result) ? result.toString() : result).toEqual(
        'three'
      )

      const current1 = await redis.lrange(listId1, 0, -1)
      const current2 = await redis.lrange(listId2, 0, -1)
      expect(
        current1.map(v => (Buffer.isBuffer(v) ? v.toString() : v))
      ).toEqual(['one', 'two'])
      expect(
        current2.map(v => (Buffer.isBuffer(v) ? v.toString() : v))
      ).toEqual(['three', 'four'])
    })

    it('should perform no operation if the source and destination are the same and both positions are RIGHT', async () => {
      const result = await redis[command](listId2, listId2, 'RIGHT', 'RIGHT')
      expect(Buffer.isBuffer(result) ? result.toString() : result).toEqual(
        'four'
      )

      const current1 = await redis.lrange(listId1, 0, -1)
      const current2 = await redis.lrange(listId2, 0, -1)
      expect(
        current1.map(v => (Buffer.isBuffer(v) ? v.toString() : v))
      ).toEqual(['one', 'two'])
      expect(
        current2.map(v => (Buffer.isBuffer(v) ? v.toString() : v))
      ).toEqual(['three', 'four'])
    })

    it('should perform no operation and return nil when source does not exist', async () => {
      const value = await redis.get('unknown')
      expect(value).toEqual(null) // Ensures nil is being represented by null

      const result = await redis[command]('unknown', listId2, 'LEFT', 'LEFT')
      expect(result).toEqual(null)
    })

    it('should error if the value is not a list', async () => {
      expect(async () => {
        await redis[command](notalist, listId2, 'LEFT', 'LEFT')
      }).rejects.toThrow(
        'WRONGTYPE Operation against a key holding the wrong kind of value'
      )
    })
  })
})

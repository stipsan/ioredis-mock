import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('lmpop', (command, equals) => {
  describe(command, () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should pop from the left (HEAD) of first non-empty list',
      () => {
        const redis = new Redis({
          data: {
            list1: [],
            list2: ['a', 'b', 'c'],
            list3: ['x', 'y', 'z'],
          },
        })

        return redis[command](3, 'list1', 'list2', 'list3', 'LEFT').then(
          result => {
            expect(equals(result[0], 'list2')).toBe(true)
            expect(
              result[1].map(v => (Buffer.isBuffer(v) ? v.toString() : v))
            ).toEqual(['a'])
            expect(redis.data.get('list2')).toEqual(['b', 'c'])
          }
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should pop from the right (TAIL) of first non-empty list',
      () => {
        const redis = new Redis({
          data: {
            list1: [],
            list2: ['a', 'b', 'c'],
            list3: ['x', 'y', 'z'],
          },
        })

        return redis[command](3, 'list1', 'list2', 'list3', 'RIGHT').then(
          result => {
            expect(equals(result[0], 'list2')).toBe(true)
            expect(
              result[1].map(v => (Buffer.isBuffer(v) ? v.toString() : v))
            ).toEqual(['c'])
            expect(redis.data.get('list2')).toEqual(['a', 'b'])
          }
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should pop multiple elements with COUNT',
      () => {
        const redis = new Redis({
          data: {
            list1: ['a', 'b', 'c', 'd', 'e'],
          },
        })

        return redis[command](1, 'list1', 'LEFT', 'COUNT', 3).then(result => {
          expect(equals(result[0], 'list1')).toBe(true)
          expect(
            result[1].map(v => (Buffer.isBuffer(v) ? v.toString() : v))
          ).toEqual(['a', 'b', 'c'])
          expect(redis.data.get('list1')).toEqual(['d', 'e'])
        })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should pop multiple elements from right with COUNT',
      () => {
        const redis = new Redis({
          data: {
            list1: ['a', 'b', 'c', 'd', 'e'],
          },
        })

        return redis[command](1, 'list1', 'RIGHT', 'COUNT', 3).then(result => {
          expect(equals(result[0], 'list1')).toBe(true)
          expect(
            result[1].map(v => (Buffer.isBuffer(v) ? v.toString() : v))
          ).toEqual(['e', 'd', 'c'])
          expect(redis.data.get('list1')).toEqual(['a', 'b'])
        })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return null when all lists are empty or non-existent',
      () => {
        const redis = new Redis({
          data: {
            list1: [],
            list2: [],
          },
        })

        return redis[command](3, 'list1', 'list2', 'list3', 'LEFT').then(
          result => {
            expect(result).toBe(null)
          }
        )
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should delete key when list becomes empty',
      () => {
        const redis = new Redis({
          data: {
            list1: ['single'],
          },
        })

        return redis[command](1, 'list1', 'LEFT')
          .then(result => {
            expect(equals(result[0], 'list1')).toBe(true)
            expect(
              result[1].map(v => (Buffer.isBuffer(v) ? v.toString() : v))
            ).toEqual(['single'])
            return redis.exists('list1')
          })
          .then(exists => {
            expect(exists).toBe(0)
          })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should pop all elements when COUNT is larger than list size',
      () => {
        const redis = new Redis({
          data: {
            list1: ['a', 'b'],
          },
        })

        return redis[command](1, 'list1', 'LEFT', 'COUNT', 5).then(result => {
          expect(equals(result[0], 'list1')).toBe(true)
          expect(
            result[1].map(v => (Buffer.isBuffer(v) ? v.toString() : v))
          ).toEqual(['a', 'b'])
          expect(redis.data.has('list1')).toBe(false)
        })
      }
    )

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should handle buffer values correctly',
      () => {
        const bufferVal1 = Buffer.from('buffer1')
        const bufferVal2 = Buffer.from('buffer2')
        const redis = new Redis({
          data: {
            list1: [bufferVal1, bufferVal2, 'string'],
          },
        })

        return redis[command](1, 'list1', 'LEFT', 'COUNT', 2).then(result => {
          expect(equals(result[0], 'list1')).toBe(true)
          expect(result[1]).toHaveLength(2)
          expect(Buffer.isBuffer(result[1][0])).toBe(true)
          expect(Buffer.isBuffer(result[1][1])).toBe(true)
          expect(result[1][0]).toEqual(bufferVal1)
          expect(result[1][1]).toEqual(bufferVal2)
        })
      }
    )

    it('should throw error for invalid number of arguments', async () => {
      const redis = new Redis()
      try {
        await expect(redis[command]()).rejects.toThrow(
          'ERR wrong number of arguments'
        )
        await expect(redis[command](1)).rejects.toThrow(
          'ERR wrong number of arguments'
        )
      } finally {
        redis.disconnect()
      }
    })

    it('should throw error for invalid numkeys', async () => {
      const redis = new Redis()
      try {
        await expect(redis[command]('invalid', 'key', 'LEFT')).rejects.toThrow(
          'ERR numkeys should be greater than 0'
        )
        await expect(redis[command](0, 'key', 'LEFT')).rejects.toThrow(
          'ERR numkeys should be greater than 0'
        )
        await expect(redis[command](-1, 'key', 'LEFT')).rejects.toThrow(
          'ERR numkeys should be greater than 0'
        )
      } finally {
        redis.disconnect()
      }
    })

    it('should throw error for invalid direction', async () => {
      const redis = new Redis()
      try {
        await expect(redis[command](1, 'key', 'INVALID')).rejects.toThrow(
          'ERR syntax error'
        )
        await expect(redis[command](1, 'key', 'left')).rejects.toThrow(
          'ERR syntax error'
        )
        await expect(redis[command](1, 'key', 'right')).rejects.toThrow(
          'ERR syntax error'
        )
      } finally {
        redis.disconnect()
      }
    })

    it('should throw error for invalid COUNT', async () => {
      const redis = new Redis()
      try {
        await expect(
          redis[command](1, 'key', 'LEFT', 'COUNT', 'invalid')
        ).rejects.toThrow('ERR count should be greater than 0')
        await expect(
          redis[command](1, 'key', 'LEFT', 'COUNT', 0)
        ).rejects.toThrow('ERR count should be greater than 0')
        await expect(
          redis[command](1, 'key', 'LEFT', 'COUNT', -1)
        ).rejects.toThrow('ERR count should be greater than 0')
      } finally {
        redis.disconnect()
      }
    })

    it('should throw error for wrong data type', async () => {
      const redis = new Redis()
      try {
        await redis.set('notalist', 'string value')
        await expect(redis[command](1, 'notalist', 'LEFT')).rejects.toThrow(
          'WRONGTYPE Operation against a key holding the wrong kind of value'
        )
      } finally {
        await redis.del('notalist')
        redis.disconnect()
      }
    })

    it('should throw error for invalid syntax', async () => {
      const redis = new Redis()
      try {
        await expect(
          redis[command](1, 'key', 'LEFT', 'INVALID')
        ).rejects.toThrow('ERR syntax error')
        await expect(
          redis[command](1, 'key', 'LEFT', 'COUNT')
        ).rejects.toThrow('ERR syntax error')
      } finally {
        redis.disconnect()
      }
    })
  })
})
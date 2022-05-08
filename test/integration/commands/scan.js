import Redis from 'ioredis'
import { convertBufferToString } from 'ioredis/built/utils'
import sortBy from 'lodash.sortby'

// eslint-disable-next-line import/no-relative-parent-imports
import { browserSafeDescribe, runTwinSuite } from '../../../test-utils'

runTwinSuite('scan', command => {
  browserSafeDescribe(command)(command, () => {
    it('should return null array if nothing in db', async () => {
      const redis = new Redis()
      const result = await redis[command](0)
      expect(result).toMatchSnapshot()
    })

    it('should return keys in db', async () => {
      const redis = new Redis()
      await redis.set('foo', 'bar')
      await redis.set('test', 'bar')

      return redis[command](0).then(result => {
        expect(convertBufferToString(result[0])).toBe('0')
        expect(sortBy(convertBufferToString(result[1]))).toEqual([
          'foo',
          'test',
        ])
      })
    })
    it('should return fail if incorrect count', () => {
      const redis = new Redis()
      return redis[command]('asdf').catch(result => {
        expect(result).toBeInstanceOf(Error)
      })
    })
    it('should return fail if incorrect command', () => {
      const redis = new Redis()
      return redis[command](0, 'ZU').catch(result => {
        expect(result).toBeInstanceOf(Error)
      })
    })
    it('should return fail if incorrect MATCH usage', () => {
      const redis = new Redis()
      return redis[command](0, 'MATCH', 'sadf', 'ZU').catch(result => {
        expect(result).toBeInstanceOf(Error)
      })
    })
    it('should return fail if incorrect COUNT usage', () => {
      const redis = new Redis()
      return redis[command](0, 'COUNT', 10, 'ZU').catch(result => {
        expect(result).toBeInstanceOf(Error)
      })
    })
    it('should return fail if incorrect COUNT usage 2', () => {
      const redis = new Redis()
      return redis[command](0, 'COUNT', 'adsf').catch(result => {
        expect(result).toBeInstanceOf(Error)
      })
    })
    it('should return only mathced keys', async () => {
      const redis = new Redis()
      await redis.set('foo0', 'x')
      await redis.set('foo1', 'x')
      await redis.set('foo2', 'x')
      await redis.set('test0', 'x')
      await redis.set('test1', 'x')

      return redis[command](0, 'MATCH', 'foo*').then(result => {
        expect(convertBufferToString(result[0])).toBe('0')
        expect(sortBy(convertBufferToString(result[1]))).toEqual([
          'foo0',
          'foo1',
          'foo2',
        ])
      })
    })
    it('should return only mathced keys and limit by COUNT', async () => {
      const redis = new Redis()
      await redis.set('foo0', 'x')
      await redis.set('foo1', 'x')
      await redis.set('foo2', 'x')
      await redis.set('test0', 'x')
      await redis.set('test1', 'x')

      return redis[command](0, 'MATCH', 'foo*', 'COUNT', 1)
        .then(result => {
          expect(convertBufferToString(result[0])).not.toBe('0') // more elements left, this is why cursor is not 0
          expect(result[1]).toEqual(expect.any(Array))
          return redis[command](result[0], 'MATCH', 'foo*', 'COUNT', 10)
        })
        .then(result2 => {
          expect(convertBufferToString(result2[0])).toBe('0')
          expect(result2[1]).toEqual(expect.any(Array))
        })
    })
    it('should return number of keys set by COUNT and continue by cursor', async () => {
      const redis = new Redis()
      await redis.set('foo0', 'x')
      await redis.set('foo1', 'x')
      await redis.set('test0', 'x')
      await redis.set('test1', 'x')

      return redis[command](0, 'COUNT', 3)
        .then(result => {
          expect(convertBufferToString(result[0])).toBe('3')
          expect(sortBy(convertBufferToString(result[1]))).toEqual([
            'foo0',
            'foo1',
            'test0',
          ])
          return redis[command](result[0], 'COUNT', 3)
        })
        .then(result2 => {
          expect(convertBufferToString(result2[0])).toBe('0')
          expect(convertBufferToString(result2[1])).toEqual(['test1'])
        })
    })
  })
})

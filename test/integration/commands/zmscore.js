import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('zmscore', command => {
  describe(command, () => {
    const redis = new Redis()
    afterAll(() => {
      redis.disconnect()
    })
    beforeEach(async () => {
      await redis.zadd(
        'foo',
        1,
        'first',
        2,
        'second',
        3,
        'third',
        4,
        'fourth',
        5,
        'fifth'
      )
      await redis.set('bar', 'not a sorted set')
    })

    it('should return the score of an existing member', () => {
      return redis[command]('foo', 'third').then(res => {
        if (command.endsWith('Buffer')) {
          expect(res).toEqual([Buffer.from('3')])
        } else {
          expect(res).toEqual(['3'])
        }
      })
    })

    it('should return the scores of existing members', () => {
      return redis[command]('foo', 'third', 'fourth', 'fifth').then(res => {
        if (command.endsWith('Buffer')) {
          expect(res).toEqual([Buffer.from('3'), Buffer.from('4'), Buffer.from('5')])
        } else {
          expect(res).toEqual(['3', '4', '5'])
        }
      })
    })

    it('should return null when the member does not exist', () => {
      return redis[command]('foo', 'sixth').then(res => expect(res).toEqual([null]))
    })

    it('should return null in place of any members that are not in the set', () => {
      return redis[command]('foo', 'fifth', 'sixth', 'seventh').then(res => {
        if (command.endsWith('Buffer')) {
          expect(res).toEqual([Buffer.from('5'), null, null])
        } else {
          expect(res).toEqual(['5', null, null])
        }
      })
    })

    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return null when the key is not a sorted set',
      () => {
        return redis[command]('bar', 'first').then(res => expect(res).toEqual([null]))
      }
    )
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return nulls for all members when the key is not a sorted set',
      () => {
        return redis[command]('bar', 'first', 'second', 'third').then(res => expect(res).toEqual([null, null, null]))
      }
    )

    it('should return null when the key does not exist', () => {
      return redis[command]('baz', 'first').then(res => expect(res).toEqual([null]))
    })
    it('should return nulls for all members when the key does not exist', () => {
      return redis[command]('baz', 'first', 'second', 'third').then(res => expect(res).toEqual([null, null, null]))
    })
  })
})

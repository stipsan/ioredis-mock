import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

const testChannels = ['emails', 'messages', 'feed']

runTwinSuite('pubsub', command => {
  // @TODO Rewrite test suite so it runs on a real Redis instance
  ;(process.env.IS_E2E ? describe.skip : describe)(command, () => {
    describe('CHANNELS', () => {
      let redis

      beforeEach(() => {
        redis = new Redis({
          host: 'pubsub',
        })
      })

      afterEach(async () => {
        await Promise.all(
          testChannels.map(x => {
            return redis.unsubscribe(x)
          })
        )
      })

      test('should return 0 when publishing without subscribers', async () => {
        expect(await redis[command]('CHANNELS')).toMatchObject([])
      })

      it('should return the single active channel', async () => {
        redis.subscribe('emails')

        expect(await redis[command]('CHANNELS')).toMatchObject(['emails'])
      })

      it('should return multiple active channels', async () => {
        redis.subscribe('emails')
        redis.subscribe('messages')
        redis.subscribe('feed')

        expect(await redis[command]('CHANNELS')).toMatchObject([
          'emails',
          'messages',
          'feed',
        ])
      })

      it('should return filtered channels', async () => {
        redis.subscribe('emails')
        redis.subscribe('messages')
        redis.subscribe('feed')

        expect(await redis[command]('CHANNELS', 'email*')).toMatchObject([
          'emails',
        ])
      })
    })
  })
})

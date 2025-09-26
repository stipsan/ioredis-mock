import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

const testChannels = ['emails', 'messages', 'feed']

runTwinSuite('pubsub', command => {
  // @TODO Rewrite test suite so it runs on a real Redis instance
  ;(process.env.IS_E2E ? describe.skip : describe)(command, () => {
    let redis

    beforeEach(() => {
      redis = new Redis({
        host: 'pubsub',
      })
    })

    afterEach(async () => {
      await Promise.all(testChannels.map(x => redis.unsubscribe(x)))
    })

    describe('CHANNELS', () => {
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

    describe('NUMSUB', () => {
      it('should return an empty array when no channels are passed', async () => {
        expect(await redis[command]('NUMSUB')).toMatchObject([])
      })

      it('should return the channels with the number of subscribers', async () => {
        redis.subscribe('emails')
        redis.subscribe('messages')

        expect(
          await redis[command]('NUMSUB', 'emails', 'messages', 'feed')
        ).toMatchObject(['emails', 1, 'messages', 1, 'feed', 0])
      })

      it('should report zero for channels that do not exist', async () => {
        expect(
          await redis[command]('NUMSUB', 'somechannel', 'someotherchannel')
        ).toMatchObject(['somechannel', 0, 'someotherchannel', 0])
      })
    })
  })
})

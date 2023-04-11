import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

runTwinSuite('xlen', command => {
  describe(command, () => {
    // @TODO Rewrite test so it runs on a real Redis instance
    ;(process.env.IS_E2E ? it.skip : it)(
      'should return the number of events in the stream',
      () => {
        const redis = new Redis({
          data: {
            stream: [
              ['3-0', ['key', 'val']],
              ['2-0', ['key', 'val']],
              ['1-0', ['key', 'val']],
            ],
          },
        })
        return redis[command]('stream').then(len => expect(len).toBe(3))
      }
    )

    it('should return 0 for a non existing stream', () => {
      const redis = new Redis()
      return redis[command]('non-existing').then(len => expect(len).toBe(0))
    })
  })
})

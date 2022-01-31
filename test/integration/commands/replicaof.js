import Redis from 'ioredis'

// eslint-disable-next-line import/no-relative-parent-imports
import { runTwinSuite } from '../../../test-utils'

const suite = (command, equals) => {
  const redis = new Redis()

  afterAll(() => {
    redis.disconnect()
  })

  it('should throw if incorrect number of arguments', async () => {
    expect.assertions(2)
    try {
      await redis[command]()
    } catch (err) {
      expect(err.message).toMatch('ERR wrong number of arguments')
    }

    try {
      await redis[command]('NO')
    } catch (err) {
      expect(err.message).toMatch('ERR wrong number of arguments')
    }
  })

  it('should return "OK" when setting to NO ONE', async () => {
    expect(equals(await redis[command]('no', 'ONE'), 'OK')).toBe(true)
    expect(equals(await redis[command]('NO', 'one'), 'OK')).toBe(true)
  })
  ;(process.env.IS_E2E ? it.skip : it)(
    'should throw an error about unsupported functionality',
    async () => {
      expect.hasAssertions()
      try {
        await redis[command]('127.0.0.1', 6799)
      } catch (err) {
        expect(err.message).toMatch('ERR Unsupported operation')
      }
    }
  )
}

runTwinSuite('replicaof', (command, equals) => {
  describe(command, () => {
    suite(command, equals)
  })
})
runTwinSuite('slaveof', (command, equals) => {
  describe(command, () => {
    suite(command, equals)
  })
})

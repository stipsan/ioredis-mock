/* eslint-disable quotes */
import Redis from 'ioredis'

describe('commands', () => {
  test('Calling unsupported command throws a descriptive error', () => {
    const redis = new Redis()
    expect(() => redis.unsupported()).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported command: \\"unsupported\\", please check the full list over mocked commands: https://github.com/stipsan/ioredis-mock/blob/main/compat.md#supported-commands-"`
    )
  })

  test('Calling unsupported buffer command throws a descriptive error', () => {
    const redis = new Redis()
    expect(() => redis.unsupportedBuffer()).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported command: \\"unsupportedBuffer\\", please check the full list over mocked commands: https://github.com/stipsan/ioredis-mock/blob/main/compat.md#supported-commands-"`
    )
  })
})

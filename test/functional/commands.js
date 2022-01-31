/* eslint-disable quotes */
import Redis from 'ioredis'

describe('commands', () => {
  test('Calling unsupported command throws a descriptive error', () => {
    const redis = new Redis()
    expect(() => redis.debug()).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported command: \\"debug\\", please check the full list over mocked commands: https://github.com/stipsan/ioredis-mock/blob/main/compat.md#supported-commands-"`
    )
  })

  test('Calling unsupported buffer command throws a descriptive error', () => {
    const redis = new Redis()
    expect(() => redis.debugBuffer()).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported command: \\"debugBuffer\\", please check the full list over mocked commands: https://github.com/stipsan/ioredis-mock/blob/main/compat.md#supported-commands-"`
    )
  })
})

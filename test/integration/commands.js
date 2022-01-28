/* eslint-disable quotes */
import Redis from 'ioredis'

describe('commands', () => {
  test('Calling buffer command when dropBufferSupport true', async () => {
    const redis = new Redis({ dropBufferSupport: true })
    await expect(() => {
      return redis.getBuffer()
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      `"*Buffer methods are not available because \\"dropBufferSupport\\" option is enabled.Refer to https://github.com/luin/ioredis/wiki/Improve-Performance for more details."`
    )
    redis.disconnect()
  })
})

import Redis from 'ioredis';

describe('info', () => {
  it('should return the specific info', async () => {
    const info = `#Server
    redis_version:5.0.7`;
    const redis = new Redis({
      data: {
        info,
      },
    });
    const value = await redis.info();

    expect(value).toEqual(info);
  });
  it('should return default info with CRLF', async () => {
    const redis = new Redis();
    const value = await redis.info();
    const lines = value.split('\r\n');

    expect(lines).toHaveLength(value.split('\n').length);
    expect(
      lines.some((line) => line.startsWith('redis_version:'))
    ).toBeTruthy();
  });
});

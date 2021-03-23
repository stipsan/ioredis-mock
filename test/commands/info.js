import MockRedis from 'ioredis';

describe('info', () => {
  it('should return the specific info', () => {
    const info = `#Server
    redis_version:5.0.7`;
    const redis = new MockRedis({
      data: {
        info,
      },
    });
    return redis.info().then((value) => {
      expect(value).toEqual(info);
    });
  });
  it('should return default info', () => {
    const redis = new MockRedis();
    return redis.info().then((value) => {
      expect(value).toMatch(/redis_version/g);
    });
  });
});

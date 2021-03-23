import MockRedis from 'ioredis';

describe('disconnect', () => {
  it('should be available, but do nothing', () => {
    const redis = new MockRedis({});
    expect(redis.disconnect()).toBe(undefined);
  });
});

import MockRedis from 'ioredis';

describe('role', () => {
  it('should return role info on the current redis instance', () => {
    const redis = new MockRedis();

    return redis.role().then((result) => expect(result).toEqual(['master', 0]));
  });

  it.skip('should return slave info', () => {});
});

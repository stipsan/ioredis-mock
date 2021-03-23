import MockRedis from 'ioredis';

describe('lastsave', () => {
  it('should return unix time since last save', () => {
    const redis = new MockRedis();

    return redis
      .lastsave()
      .then((result) =>
        expect(result).toBeLessThanOrEqual(
          Math.floor(new Date().getTime() / 1000)
        )
      );
  });
});

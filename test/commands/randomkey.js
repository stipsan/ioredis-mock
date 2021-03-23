import MockRedis from 'ioredis';

describe('randomkey', () => {
  it('should return a random key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
        bar: 'foo',
      },
    });

    return redis
      .randomkey()
      .then((result) => expect(['foo', 'bar']).toContain(result));
  });

  it('should return null if db is empty', () => {
    const redis = new MockRedis();

    return redis.randomkey().then((result) => expect(result).toBe(null));
  });
});

import MockRedis from 'ioredis';

describe('get', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis.get('foo').then((result) => expect(result).toBe(null));
  });

  it('should return value of key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });

    return redis.get('foo').then((result) => expect(result).toBe('bar'));
  });
});

import MockRedis from 'ioredis';

describe('keys', () => {
  it('should return an empty array if there are no keys', () => {
    const redis = new MockRedis();

    return redis.keys('*').then((result) => expect(result).toEqual([]));
  });

  it('should return all data keys', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
        baz: 'quux',
      },
    });

    return redis
      .keys('*')
      .then((result) => expect(result).toEqual(['foo', 'baz']));
  });

  it('should only return keys matching the given pattern', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
        baz: 'quux',
        flambé: 'baked alaska',
      },
    });

    return redis
      .keys('f*')
      .then((result) => expect(result).toEqual(['foo', 'flambé']));
  });

  it('should not return empty sets', () => {
    const redis = new MockRedis();

    return redis
      .sadd('a', 'b')
      .then(() => redis.srem('a', 'b'))
      .then(() => redis.keys('*'))
      .then((result) => expect(result).toEqual([]));
  });
});

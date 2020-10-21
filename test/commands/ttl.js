import expect from 'expect';

import MockRedis from '../../src';

describe('ttl', () => {
  it('should return -2 if key does not exist', () => {
    const redis = new MockRedis();

    return redis.ttl('foo').then((result) => expect(result).toBe(-2));
  });

  it('should return -1 if key exist but have no expire', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });

    return redis.ttl('foo').then((result) => expect(result).toBe(-1));
  });

  it('should return seconds left until expire', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });

    return redis
      .expire('foo', 1)
      .then(() => redis.ttl('foo'))
      .then((result) => expect(result).toBe(1));
  });
});

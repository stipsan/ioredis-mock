import MockRedis from '../../src';

describe('getset', () => {
  it('should set the new value and return the old value', () => {
    const redis = new MockRedis({
      data: {
        foo: 'Hello',
      },
    });
    return redis
      .getset('foo', 'World')
      .then((result) => expect(result).toBe('Hello'))
      .then(() => expect(redis.data.get('foo')).toBe('World'));
  });
  it('should set the new value and return null when does not have an old value', () => {
    const redis = new MockRedis({
      data: {},
    });
    return redis
      .getset('foo', 'World')
      .then((result) => expect(result).toBe(null))
      .then(() => expect(redis.data.get('foo')).toBe('World'));
  });
});

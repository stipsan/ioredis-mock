import MockRedis from '../../src';

describe('persist', () => {
  it('should remove expire status on key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    return redis
      .expire('foo', 1)
      .then(() => redis.persist('foo'))
      .then((status) => {
        expect(status).toBe(1);
        expect(redis.expires.has('foo')).toBe(false);
      });
  });

  it('should return 0 if key does not have expire status', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    return redis.persist('foo').then((status) => expect(status).toBe(0));
  });

  it('should return 0 if key does not exist', () => {
    const redis = new MockRedis();

    return redis.persist('foo').then((status) => expect(status).toBe(0));
  });
});

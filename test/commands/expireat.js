import expect from 'expect';

import MockRedis from '../../src';

describe('expireat', () => {
  it('should set expire status on key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    const at = Math.ceil(Date.now() / 1000) + 1;
    return redis.expireat('foo', at).then((status) => {
      expect(status).toBe(1);
      expect(redis.expires.has('foo')).toBe(true);

      return redis.ttl('foo');
    }).then(result => expect(result).toBeGreaterThanOrEqualTo(1));
  });

  it('should return 0 if key does not exist', () => {
    const redis = new MockRedis();
    const at = Math.ceil(Date.now() / 1000);
    return redis.expireat('foo', at).then(status => expect(status).toBe(0));
  });
});

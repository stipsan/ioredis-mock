import expect from 'expect';

import MockRedis from '../../src';

describe('pexpireat', () => {
  it('should set expire status on key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    const at = Date.now() + 2000;
    return redis.pexpireat('foo', at).then((status) => {
      expect(status).toBe(1);
      expect(redis.expires.has('foo')).toBe(true);

      return redis.ttl('foo');
    }).then(result => expect(result).toBeGreaterThanOrEqualTo(1));
  });

  it('should return 0 if key does not exist', () => {
    const redis = new MockRedis();
    const at = Date.now();
    return redis.pexpireat('foo', at).then(status => expect(status).toBe(0));
  });
});

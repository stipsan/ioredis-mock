import expect from 'expect';
import Promise from 'bluebird';

import MockRedis from '../../src';

describe('pexpireat', () => {
  it('should set expire status on key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    const at = Date.now() + 100;
    return redis
      .pexpireat('foo', at)
      .then(status => {
        expect(status).toBe(1);
        expect(redis.expires.has('foo')).toBe(true);

        return redis.ttl('foo');
      })
      .then(result => expect(result).toBeGreaterThanOrEqualTo(1))
      .then(() => Promise.delay(200))
      .then(() => redis.get('foo'))
      .then(result => expect(result).toBe(null));
  });

  it('should return 0 if key does not exist', () => {
    const redis = new MockRedis();
    const at = Date.now();
    return redis.pexpireat('foo', at).then(status => expect(status).toBe(0));
  });
});

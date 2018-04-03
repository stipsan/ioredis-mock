import expect from 'expect';
import Promise from 'bluebird';

import MockRedis from '../../src';

describe('pexpire', () => {
  it('should set expire status on key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    return redis
      .pexpire('foo', 100)
      .then(status => {
        expect(status).toBe(1);
        expect(redis.expires.has('foo')).toBe(true);

        return redis.pttl('foo');
      })
      .then(result => expect(result).toBeGreaterThanOrEqualTo(1))
      .then(() => Promise.delay(200))
      .then(() => redis.get('foo'))
      .then(result => expect(result).toBe(null));
  });

  it('should return 0 if key does not exist', () => {
    const redis = new MockRedis();
    return redis.pexpire('foo', 100).then(status => expect(status).toBe(0));
  });
});

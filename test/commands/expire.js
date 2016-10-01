import expect from 'expect';
import Promise from 'bluebird';

import MockRedis from '../../src';

describe('expire', () => {
  it('should delete key on get', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    return Promise.all([
      redis.expire('foo', 1),
      redis.get('foo'),
      Promise.delay(1000).then(() => redis.get('foo')),
    ]).then(([status, beforeExpire, afterExpire]) => {
      expect(status).toBe('1');
      expect(beforeExpire).toBe('bar');
      expect(afterExpire).toBe(null);
      expect(redis.data.has('foo')).toBe(false);
    });
  });

  it('should delete key on garbage collect', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    return redis.expire('foo', 0).then(() => expect(redis.data.has('foo')).toBe(false));
  });

  it('should return 0 if key does not exist', () => {
    const redis = new MockRedis();
    return redis.expire('foo', 1).then(status => expect(status).toBe('0'));
  });

  it('should remove expire on SET', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    return redis.expire('foo', 1)
      .then(() => redis.set('foo', 'baz'))
      .then(() => expect(redis.expires.has('foo')).toBe(false));
  });

  it('should remove expire on GETSET', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    return redis.expire('foo', 1)
      .then(() => redis.getset('foo', 'baz'))
      .then(() => expect(redis.expires.has('foo')).toBe(false));
  });

  it('should move expire on RENAME', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });
    return redis.expire('foo', 1)
      .then(() => redis.rename('foo', 'baz'))
      .then(() => expect(redis.expires.has('baz')).toBe(true));
  });
});

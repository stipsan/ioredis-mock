import expect from 'expect';

import MockRedis from '../../src';

describe('setex', () => {
  it('should set value and expire', () => {
    const redis = new MockRedis();
    return redis
      .setex('foo', 1, 'bar')
      .then((status) => expect(status).toBe('OK'))
      .then(() => {
        expect(redis.data.get('foo')).toBe('bar');
        expect(redis.expires.has('foo')).toBe(true);
      });
  });
});

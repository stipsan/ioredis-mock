import expect from 'expect';

import MockRedis from '../../src';

describe('psetex', () => {
  it('should set value and expire', () => {
    const redis = new MockRedis();
    return redis
      .psetex('foo', 1000, 'bar')
      .then(status => expect(status).toBe('OK'))
      .then(() => {
        expect(redis.data.get('foo')).toBe('bar');
        expect(redis.expires.has('foo')).toBe(true);
      });
  });
});

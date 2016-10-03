import expect from 'expect';

import MockRedis from '../../src';

describe('set', () => {
  it('should return OK when setting a hash key', () => {
    const redis = new MockRedis();
    return redis.set('foo', 'bar').then(status => expect(status).toBe('OK'))
      .then(() => expect(redis.data.get('foo')).toBe('bar'));
  });

  it('should turn number to string', () => {
    const redis = new MockRedis();
    return redis.set('foo', 1.5).then(status => expect(status).toBe('OK'))
      .then(() => expect(redis.data.get('foo')).toBe('1.5'));
  });
});

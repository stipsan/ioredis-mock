import expect from 'expect';

import MockRedis from '../../src';

describe('set', () => {
  it('should return OK when setting a hash key', () => {
    const redis = new MockRedis();
    return redis.set('foo', 'bar').then(status => expect(status).toBe('OK'))
      .then(() => expect(redis.data.foo).toBe('bar'));
  });
});

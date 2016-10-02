import expect from 'expect';

import MockRedis from '../../src';

describe('mset', () => {
  it('should batch set values', () => {
    const redis = new MockRedis();
    return redis.mset('key1', 'Hello', 'key2', 'World')
      .then(status => expect(status).toBe('OK'))
      .then(() => {
        expect(redis.data.get('key1')).toBe('Hello');
        expect(redis.data.get('key2')).toBe('World');
      });
  });
});

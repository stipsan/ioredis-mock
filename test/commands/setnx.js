import expect from 'expect';

import MockRedis from '../../src';

describe('setnx', () => {
  it('should set a key with value if it does not exist already', () => {
    const redis = new MockRedis();
    return redis.setnx('foo', 'bar')
      .then(status => expect(status).toBe('1'))
      .then(() => {
        expect(redis.data.foo)
          .toBe('bar', 'value failed to persist');
        return redis.setnx('foo', 'baz');
      })
      .then(status => expect(status).toBe('0', 'setnx no-op failed on existing key'))
      .then(() => {
        expect(redis.data.foo)
          .toBe('bar', 'existing value was overwritten');
      });
  });
});

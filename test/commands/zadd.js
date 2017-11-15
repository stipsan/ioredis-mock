import expect from 'expect';

import MockRedis from '../../src';

describe('zadd', () => {
  it('should add 1 item to sorted set', () => {
    const redis = new MockRedis();

    return redis
      .zadd('foos', '1', 'foo')
      .then(status => expect(status).toBe(1))
      .then(() => expect(redis.data.get('foos').has('foo')).toBe(true));
  });
  it('should add 2 items to sorted set', () => {
    const redis = new MockRedis();

    return redis
      .zadd('foos', '1', 'foo', '2', 'baz')
      .then(status => expect(status).toBe(2))
      .then(() => {
        expect(redis.data.get('foos').has('foo')).toBe(true);
        expect(redis.data.get('foos').has('baz')).toBe(true);
        expect(redis.data.get('foos').has('bar')).toBe(false);
      });
  });
  it('should not increase length when adding duplicates', () => {
    const redis = new MockRedis();

    return redis
      .zadd('key', 'value', 'value')
      .then(status => expect(status).toBe(1))
      .then(() => expect(redis.data.get('key').has('value')).toBe(true));
  });
});

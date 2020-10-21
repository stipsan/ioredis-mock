import expect from 'expect';

import MockRedis from '../../src';

describe('zrem', () => {
  const data = {
    foos: new Map([
      ['foo', { value: 'foo', score: 1 }],
      ['bar', { value: 'bar', score: 2 }],
      ['baz', { value: 'baz', score: 3 }],
    ]),
  };
  it('should remove 1 item from sorted set', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrem('foos', 'foo')
      .then((status) => expect(status).toBe(1))
      .then(() => expect(redis.data.get('foos').has('foo')).toBe(false));
  });
  it('should remove 2 items from sorted set', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrem('foos', 'foo', 'baz')
      .then((status) => expect(status).toBe(2))
      .then(() => {
        expect(redis.data.get('foos').has('foo')).toBe(false);
        expect(redis.data.get('foos').has('bar')).toBe(true);
        expect(redis.data.get('foos').has('baz')).toBe(false);
      });
  });
  it('should not remove an item that does not exist', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrem('foos', 'qux')
      .then((status) => expect(status).toBe(0))
      .then(() => expect(redis.data.get('foos').has('qux')).toBe(false));
  });
  it('should ignore non-existent keys', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrem('bars', 'bar')
      .then((status) => expect(status).toBe(0))
      .then(() => expect(redis.data.get('bars')).toNotExist());
  });
});

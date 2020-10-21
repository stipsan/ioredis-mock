import expect from 'expect';

import MockRedis from '../../src';

describe('zadd', () => {
  it('should add 1 item to sorted set', () => {
    const redis = new MockRedis();

    return redis
      .zadd('foos', '1', 'foo')
      .then((status) => expect(status).toBe(1))
      .then(() => expect(redis.data.get('foos').has('foo')).toBe(true));
  });
  it('should add 2 items to sorted set', () => {
    const redis = new MockRedis();

    return redis
      .zadd('foos', '1', 'foo', '2', 'baz')
      .then((status) => expect(status).toBe(2))
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
      .then((status) => expect(status).toBe(1))
      .then(() => expect(redis.data.get('key').has('value')).toBe(true));
  });
  it('should not allow nx and xx options in the same call', () => {
    const redis = new MockRedis();

    return redis
      .zadd('key', ['NX', 'XX'], 1, 'value')
      .catch((e) =>
        expect(e.message).toEqual(
          'XX and NX options at the same time are not compatible'
        )
      );
  });
  it('should not update a value that exists with NX option', () => {
    const redis = new MockRedis();

    redis.zadd('key', 'NX', 1, 'value').then(() => {
      redis.zadd('key', 'NX', 2, 'value').then((r) => expect(r).toBe(0));
    });
  });
  it('should return updated + added with CH option', () => {
    const redis = new MockRedis();

    redis.zadd('key', 1, 'value').then(() => {
      redis
        .zadd('key', 'CH', 3, 'value', 2, 'value2')
        .then((r) => expect(r).toBe(2));
    });
  });
  it('should only update elements that already exist with XX option', () => {
    const redis = new MockRedis();

    redis.zadd('key', 1, 'value').then(() => {
      redis
        .zadd('key', ['XX', 'CH'], 2, 'value')
        .then((r) => expect(r).toBe(1));
    });
  });
  it('should handle INCR option', () => {
    const redis = new MockRedis();

    redis.zadd('key', 1, 'value').then(() => {
      redis
        .zadd('key', 'INCR', 2, 'value')
        .then(() =>
          expect(redis.data.get('key').get('value').score).toEqual(3)
        );
    });
  });
});

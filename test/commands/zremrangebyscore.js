import Map from 'es6-map';
import expect from 'expect';

import MockRedis from '../../src';

describe('zremrangebyscore', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
  };

  it('should do nothing if key does not exist', () => {
    const redis = new MockRedis({ data: {} });

    return redis
      .zremrangebyscore('foo', 0, 2)
      .then(status => expect(status).toBe(0))
      .then(() => expect(redis.data.has('foo')).toBe(false));
  });

  it('should remove using not strict compare', () => {
    const redis = new MockRedis({ data });

    return redis
      .zremrangebyscore('foo', 1, 3)
      .then(res => expect(res).toBe(3))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(false);
        expect(redis.data.get('foo').has('second')).toBe(false);
        expect(redis.data.get('foo').has('third')).toBe(false);
        expect(redis.data.get('foo').has('fourth')).toBe(true);
        expect(redis.data.get('foo').has('fifth')).toBe(true);
      });
  });

  it('should return using strict compare', () => {
    const redis = new MockRedis({ data });

    return redis
      .zremrangebyscore('foo', '(3', 5)
      .then(res => expect(res).toEqual(2))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(true);
        expect(redis.data.get('foo').has('second')).toBe(true);
        expect(redis.data.get('foo').has('third')).toBe(true);
        expect(redis.data.get('foo').has('fourth')).toBe(false);
        expect(redis.data.get('foo').has('fifth')).toBe(false);
      });
  });

  it('should accept infinity string', () => {
    const redis = new MockRedis({ data });

    return redis
      .zremrangebyscore('foo', '-inf', '+inf')
      .then(res => expect(res).toEqual(5))
      .then(() => {
        expect(redis.data.get('foo').has('first')).toBe(false);
        expect(redis.data.get('foo').has('second')).toBe(false);
        expect(redis.data.get('foo').has('third')).toBe(false);
        expect(redis.data.get('foo').has('fourth')).toBe(false);
        expect(redis.data.get('foo').has('fifth')).toBe(false);
      });
  });

  it('should return zero if out-of-range', () => {
    const redis = new MockRedis({ data });

    return redis
      .zremrangebyscore('foo', 100, 10)
      .then(res => expect(res).toEqual(0));
  });

  it('should return zero if key not found', () => {
    const redis = new MockRedis({ data });

    return redis
      .zremrangebyscore('boo', 100, 10)
      .then(res => expect(res).toEqual(0));
  });

  it('should return zero if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .zremrangebyscore('foo', 2, 1)
      .then(res => expect(res).toEqual(0));
  });
});

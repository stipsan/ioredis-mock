import Map from 'es6-map';
import expect from 'expect';

import MockRedis from '../../src';

describe('zrange', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
  };
  it('should return first 3 items ordered by score', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrange('foo', 0, 2)
      .then(res => expect(res).toEqual(['first', 'second', 'third']));
  });

  it('should return last 3 items', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrange('foo', -3, -1)
      .then(res => expect(res).toEqual(['third', 'fourth', 'fifth']));
  });

  it('should return last all items on larger numbers', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrange('foo', 0, 100)
      .then(res =>
        expect(res).toEqual(['first', 'second', 'third', 'fourth', 'fifth'])
      );
  });

  it('should return empty array if out-of-range', () => {
    const redis = new MockRedis({ data });

    return redis.zrange('foo', 10, 100).then(res => expect(res).toEqual([]));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .zrange('foo', 0, 2)
      .catch(err =>
        expect(err.message).toBe('Key foo does not contain a sorted list')
      );
  });
});

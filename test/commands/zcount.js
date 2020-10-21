import Map from 'es6-map';
import expect from 'expect';

import MockRedis from '../../src';

describe('zcount', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
  };
  it('should return using not strict compare', () => {
    const redis = new MockRedis({ data });

    return redis.zcount('foo', 1, 3).then((res) => expect(res).toEqual(3));
  });

  it('should return using strict compare', () => {
    const redis = new MockRedis({ data });

    return redis.zcount('foo', '(3', 5).then((res) => expect(res).toEqual(2));
  });

  it('should accept infinity string', () => {
    const redis = new MockRedis({ data });

    return redis
      .zcount('foo', '-inf', '+inf')
      .then((res) => expect(res).toEqual(5));
  });

  it('should return 0 if out-of-range', () => {
    const redis = new MockRedis({ data });

    return redis.zcount('foo', 10, 100).then((res) => expect(res).toEqual(0));
  });

  it('should return 0 if key not found', () => {
    const redis = new MockRedis({ data });

    return redis.zcount('boo', 10, 100).then((res) => expect(res).toEqual(0));
  });

  it('should return 0 if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis.zcount('foo', 1, 2).then((res) => expect(res).toEqual(0));
  });
});

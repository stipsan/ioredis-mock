import Map from 'es6-map';
import expect from 'expect';

import MockRedis from '../../src';

describe('zrevrangebyscore', () => {
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

    return redis
      .zrevrangebyscore('foo', 3, 1)
      .then(res => expect(res).toEqual(['third', 'second', 'first']));
  });

  it('should return using strict compare', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrevrangebyscore('foo', 5, '(3')
      .then(res => expect(res).toEqual(['fifth', 'fourth']));
  });

  it('should accept infinity string', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrevrangebyscore('foo', '+inf', '-inf')
      .then(res =>
        expect(res).toEqual(['fifth', 'fourth', 'third', 'second', 'first'])
      );
  });

  it('should return empty array if out-of-range', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrevrangebyscore('foo', 100, 10)
      .then(res => expect(res).toEqual([]));
  });

  it('should return empty array if key not found', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrevrangebyscore('boo', 100, 10)
      .then(res => expect(res).toEqual([]));
  });

  it('should return empty array if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .zrevrangebyscore('foo', 2, 1)
      .then(res => expect(res).toEqual([]));
  });

  it('should include scores if WITHSCORES is specified', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrevrangebyscore('foo', 3, 1, 'WITHSCORES')
      .then(res => expect(res).toEqual(['third', 3, 'second', 2, 'first', 1]));
  });
});

import Map from 'es6-map';
import expect from 'expect';

import MockRedis from '../../src';

describe('zrangebyscore', () => {
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
      .zrangebyscore('foo', 1, 3)
      .then(res => expect(res).toEqual(['first', 'second', 'third']));
  });

  it('should can using strict compare', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('foo', '(3', 5)
      .then(res => expect(res).toEqual(['fourth', 'fifth']));
  });

  it('should accept infinity string', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('foo', '-inf', '+inf')
      .then(res =>
        expect(res).toEqual(['first', 'second', 'third', 'fourth', 'fifth'])
      );
  });

  it('should return empty array if out-of-range', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('foo', 10, 100)
      .then(res => expect(res).toEqual([]));
  });

  it('should return empty array if key not found', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('boo', 10, 100)
      .then(res => expect(res).toEqual([]));
  });

  it('should return empty array if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .zrangebyscore('foo', 1, 2)
      .then(res => expect(res).toEqual([]));
  });
});

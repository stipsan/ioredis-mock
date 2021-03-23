import Map from 'es6-map';

import MockRedis from 'ioredis';

describe('zscore', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
    bar: 'not a sorted set',
  };

  it('should return the score of an existing member as a string', () => {
    const redis = new MockRedis({ data });

    return redis.zscore('foo', 'third').then((res) => expect(res).toBe('3'));
  });

  it('should return null when the member does not exist', () => {
    const redis = new MockRedis({ data });

    return redis.zscore('foo', 'sixth').then((res) => expect(res).toBeFalsy());
  });

  it('should return null when the key is not a sorted set', () => {
    const redis = new MockRedis({ data });

    return redis.zscore('bar', 'first').then((res) => expect(res).toBeFalsy());
  });

  it('should return null when the key does not exist', () => {
    const redis = new MockRedis({ data });

    return redis.zscore('baz', 'first').then((res) => expect(res).toBeFalsy());
  });
});

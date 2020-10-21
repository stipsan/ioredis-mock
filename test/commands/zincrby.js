import expect from 'expect';

import MockRedis from '../../src';

describe('zincrby', () => {
  const data = {
    foos: new Map([
      ['foo', { value: 'foo', score: 1 }],
      ['bar', { value: 'bar', score: 2 }],
      ['baz', { value: 'baz', score: 3 }],
    ]),
  };
  it('should increment the score of an item in a sorted set', () => {
    const redis = new MockRedis({ data });
    return redis
      .zincrby('foos', 10, 'foo')
      .then((status) => expect(status).toBe('11'))
      .then(() =>
        expect(redis.data.get('foos').get('foo')).toEqual({
          value: 'foo',
          score: 11,
        })
      );
  });
  it('should initialize a non-existent key', () => {
    const redis = new MockRedis({ data });
    return redis
      .zincrby('foos', 4, 'qux')
      .then((status) => expect(status).toBe('4'))
      .then(() => {
        expect(redis.data.get('foos').get('qux')).toEqual({
          value: 'qux',
          score: 4,
        });
      });
  });
});

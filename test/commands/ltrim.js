import expect from 'expect';

import MockRedis from '../../src';

describe('ltrim', () => {
  it('should trim to the items specified when count is positive', () => {
    const redis = new MockRedis({
      data: {
        foo: ['one', 'two', 'three'],
      },
    });

    return redis
      .ltrim('foo', 0, 1)
      .then(() => expect(redis.data.get('foo')).toEqual(['one', 'two']));
  });

  it('should trim to the items from the end of the list when count is negative', () => {
    const redis = new MockRedis({
      data: {
        foo: ['one', 'two', 'three'],
      },
    });

    return redis
      .ltrim('foo', -1, -1)
      .then(() => expect(redis.data.get('foo')).toEqual(['three']));
  });

  it('should trim all the items when range is [0,-1]', () => {
    const redis = new MockRedis({
      data: {
        foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
      },
    });

    return redis
      .ltrim('foo', 0, -1)
      .then(() =>
        expect(redis.data.get('foo')).toEqual([
          'foo',
          'bar',
          'foo',
          'baz',
          'foo',
        ])
      );
  });

  it('should return "OK" ', () => {
    const redis = new MockRedis({
      data: {
        foo: ['foo', 'bar', 'foo', 'baz', 'foo'],
      },
    });

    return redis.ltrim('foo', 0, 0).then(message => expect(message).toBe('OK'));
  });
});

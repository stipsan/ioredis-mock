import expect from 'expect';

import MockRedis from '../../src';

describe('hkeys', () => {
  it('should return an empty array if there are no keys', () => {
    const redis = new MockRedis();

    return redis.hkeys('foo').then((result) => expect(result).toEqual([]));
  });

  it('should return all data keys', () => {
    const redis = new MockRedis({
      data: {
        foo: { bar: '1', baz: '2' },
      },
    });

    return redis
      .hkeys('foo')
      .then((result) => expect(result).toEqual(['bar', 'baz']));
  });
});

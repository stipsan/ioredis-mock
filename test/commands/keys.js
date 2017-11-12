import expect from 'expect';

import MockRedis from '../../src';

describe('keys', () => {
  it('should return an empty array if there are no keys', () => {
    const redis = new MockRedis();

    return redis.keys('*').then(result => expect(result).toEqual([]));
  });

  it('should return all data keys', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
        baz: 'quux',
      },
    });

    return redis
      .keys('*')
      .then(result => expect(result).toEqual(['foo', 'baz']));
  });

  it('should only return keys matching the given pattern', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
        baz: 'quux',
        flambé: 'baked alaska',
      },
    });

    return redis
      .keys('f*')
      .then(result => expect(result).toEqual(['foo', 'flambé']));
  });
});

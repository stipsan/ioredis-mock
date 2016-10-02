import expect from 'expect';

import MockRedis from '../../src';

describe('srandmember', () => {
  it('should return a random item', () => {
    const redis = new MockRedis({
      data: {
        myset: ['one', 'two', 'three'],
      },
    });

    return redis.srandmember('myset')
      .then(result => expect(['one', 'two', 'three']).toInclude(result));
  });

  it('should return random unique items', () => {
    const redis = new MockRedis({
      data: {
        myset: ['one', 'two', 'three'],
      },
    });

    return redis.srandmember('myset', 2)
      .then((results) => {
        expect(['one', 'two', 'three']).toInclude(results[0]);
        expect(['one', 'two', 'three']).toInclude(results[1]);
        expect(results[0]).toNotBe(results[1]);
      });
  });

  it('should return list if positive count is bigger than list', () => {
    const redis = new MockRedis({
      data: {
        myset: ['one', 'two', 'three'],
      },
    });

    return redis.srandmember('myset', 5)
      .then(results => expect(results).toEqual(['one', 'two', 'three']));
  });

  it('should return random items with specified length', () => {
    const redis = new MockRedis({
      data: {
        myset: ['one', 'two', 'three'],
      },
    });

    return redis.srandmember('myset', -5)
      .then(results => expect(results.length).toBe(5));
  });

  it('should return null if set is empty', () => {
    const redis = new MockRedis();

    return redis.srandmember('myset').then(result => expect(result).toBe(null));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis.srandmember('foo')
      .catch(err => expect(err.message).toBe('Key foo does not contain a list'));
  });
});

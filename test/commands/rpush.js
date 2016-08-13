import expect from 'expect';

import MockRedis from '../../src';

describe('rpush', () => {
  it('should add the values to the list in the correct order', () => {
    const redis = new MockRedis({
      data: {
        foo: [1],
      },
    });

    return redis.rpush('foo', 9, 8, 7).then(() => expect(redis.data.foo).toEqual([1, 9, 8, 7]));
  });

  it('should return the new length of the list', () => {
    const redis = new MockRedis({
      data: {},
    });

    return redis.rpush('foo', 9, 8, 7).then(length => expect(length).toBe(3));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis.rpush('foo', 1)
      .catch(err => expect(err.message).toBe('Key foo does not contain a list'));
  });
});

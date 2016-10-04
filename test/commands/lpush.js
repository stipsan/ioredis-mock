import expect from 'expect';

import MockRedis from '../../src';

describe('lpush', () => {
  it('should add the values to the list in the correct order', () => {
    const redis = new MockRedis({
      data: {
        foo: ['1'],
      },
    });

    return redis.lpush('foo', 9, 8, 7)
      .then(() => expect(redis.data.get('foo')).toEqual(['7', '8', '9', '1']));
  });

  it('should return the new length of the list', () => {
    const redis = new MockRedis({
      data: {
      },
    });

    return redis.lpush('foo', 9, 8, 7).then(length => expect(length).toBe(3));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis.lpush('foo', 1)
      .catch(err => expect(err.message).toBe('Key foo does not contain a list'));
  });
});

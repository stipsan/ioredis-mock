import expect from 'expect';
import MockRedis from '../../src';

describe('lrange', () => {
  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis.lrange('foo', 1, 2)
      .catch(err => expect(err.message).toBe('Key foo does not contain a list'));
  });

  it('should return an empty list if `start` is larger than the size of the list', () => {
    const redis = new MockRedis({
      data: {
        foo: ['1'],
      },
    });

    return redis.lrange('foo', 1, 2)
      .then(result => expect(result).toEqual([]));
  });
});

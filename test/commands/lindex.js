import expect from 'expect';

import MockRedis from '../../src';

describe('lindex', () => {
  it('should return item list', () => {
    const redis = new MockRedis({
      data: {
        mylist: ['Hello', 'World'],
      },
    });

    return redis
      .lindex('mylist', 0)
      .then((result) => expect(result).toBe('Hello'))
      .then(() => redis.lindex('mylist', -1))
      .then((result) => expect(result).toBe('World'))
      .then(() => redis.lindex('mylist', 3))
      .then((result) => expect(result).toBe(null));
  });

  it('should return null if the list does not exist', () => {
    const redis = new MockRedis({
      data: {},
    });

    return redis.lindex('foo', 0).then((result) => expect(result).toBe(null));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .lindex('foo', 0)
      .catch((err) =>
        expect(err.message).toBe('Key foo does not contain a list')
      );
  });
});

import expect from 'expect';

import MockRedis from '../../src';

describe('llen', () => {
  it('should return the number of items in the list', () => {
    const redis = new MockRedis({
      data: {
        foo: [1, 3, 4],
      },
    });

    return redis.llen('foo').then(length => expect(length).toBe(3));
  });

  it('should return 0 if the list does not exist', () => {
    const redis = new MockRedis({
      data: {
      },
    });

    return redis.llen('foo').then(length => expect(length).toBe(0));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis.llen('foo')
      .catch(err => expect(err.message).toBe('Key foo does not contain a list'));
  });
});

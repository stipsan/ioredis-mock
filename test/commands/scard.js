import expect from 'expect';
import Set from 'es6-set';

import MockRedis from '../../src';

describe('scard', () => {
  it('should return the number of items in the set', () => {
    const redis = new MockRedis({
      data: {
        foo: new Set([1, 3, 4]),
      },
    });

    return redis.scard('foo').then(length => expect(length).toBe(3));
  });

  it('should return 0 if the set does not exist', () => {
    const redis = new MockRedis();

    return redis.scard('foo').then(length => expect(length).toBe(0));
  });

  it('should throw an exception if the key contains something other than a set', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a set',
      },
    });

    return redis
      .scard('foo')
      .catch(err => expect(err.message).toBe('Key foo does not contain a set'));
  });
});

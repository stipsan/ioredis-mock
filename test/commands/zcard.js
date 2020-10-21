import expect from 'expect';
import Map from 'es6-map';

import MockRedis from '../../src';

describe('zcard', () => {
  it('should return the number of items in the sorted set', () => {
    const redis = new MockRedis({
      data: {
        foo: new Map([
          [1, 'one'],
          [3, 'three'],
          [4, 'four'],
        ]),
      },
    });

    return redis.zcard('foo').then((length) => expect(length).toBe(3));
  });

  it('should return 0 if the sorted set does not exist', () => {
    const redis = new MockRedis();

    return redis.zcard('foo').then((length) => expect(length).toBe(0));
  });

  it('should throw an exception if the key contains something other than a sorted set', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a sorted set',
      },
    });

    return redis
      .zcard('foo')
      .catch((err) =>
        expect(err.message).toBe('Key foo does not contain a sorted set')
      );
  });
});

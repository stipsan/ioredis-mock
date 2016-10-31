import expect from 'expect';

import MockRedis from '../../src';

describe('rpopBuffer', () => {
  it('should remove and return last element of list', () => {
    const redis = new MockRedis({
      data: {
        foo: ['1', '2', '3'],
      },
    });

    return redis.rpopBuffer('foo')
      .then(result => expect(result).toBe('3'))
      .then(() => expect(redis.data.get('foo')).toEqual(['1', '2']));
  });

  it('should return buffer values correctly', () => {
    const bufferVal = new Buffer([0xb3,0xf9,0x94,0xa7,0xe2,0xf6,0x27,0x95,0xab,0xd8,0xc8,0x4a,0xef,0xb5,0xea,0xe3]);
    const redis = new MockRedis({
      data: {
        foo: ['1', '2', bufferVal],
      },
    });

    return redis.rpopBuffer('foo')
      .then(result => expect(result).toBe(bufferVal))
  });

  it('should return null on empty list', () => {
    const redis = new MockRedis({
      data: {
        foo: [],
      },
    });

    return redis.rpopBuffer('foo').then(result => expect(result).toBe(null));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis.rpopBuffer('foo')
      .catch(err => expect(err.message).toBe('Key foo does not contain a list'));
  });
});

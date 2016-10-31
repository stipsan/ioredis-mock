import expect from 'expect';

import MockRedis from '../../src';

describe('getBuffer', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis.getBuffer('foo').then(result => expect(result).toBe(null));
  });

  it('should return value of key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });

    return redis.getBuffer('foo').then(result => expect(result).toBe('bar'));
  });

  it('should return buffer values correctly', () => {
    const bufferVal = new Buffer([0xb3,0xf9,0x94,0xa7,0xe2,0xf6,0x27,0x95,0xab,0xd8,0xc8,0x4a,0xef,0xb5,0xea,0xe3]);
    const redis = new MockRedis({
      data: {
        foo: bufferVal,
      },
    });

    return redis.getBuffer('foo').then(result => expect(result).toBe(bufferVal));
  });
});

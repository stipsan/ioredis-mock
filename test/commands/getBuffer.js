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
    const bufferVal = new Buffer('bar');
    const redis = new MockRedis({
      data: {
        foo: bufferVal,
      },
    });

    return redis.getBuffer('foo').then(result => expect(result).toBe(bufferVal));
  });
});

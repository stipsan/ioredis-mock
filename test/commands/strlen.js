import expect from 'expect';

import MockRedis from '../../src';

describe('strlen', () => {
  it('should return 0 on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis.strlen('nonexisting').then(result => expect(result).toBe('0'));
  });

  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis({
      data: {
        mykey: 'Hello world',
      },
    });

    return redis.strlen('mykey').then(result => expect(result).toBe('11'));
  });
});

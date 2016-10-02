import expect from 'expect';

import MockRedis from '../../src';

describe('incrbyfloat', () => {
  it('should increment an float with passed increment', () => {
    const redis = new MockRedis({
      data: {
        mykey: '10.50',
      },
    });

    return redis.incrbyfloat('mykey', 0.1).then(result => expect(result).toBe('10.6'))
      .then(() => redis.incrbyfloat('mykey', -5)).then(result => expect(result).toBe('5.6'));
  });

  it('should support exponents', () => {
    const redis = new MockRedis({
      data: {
        mykey: '5.0e3',
      },
    });

    return redis.incrbyfloat('mykey', '2.0e2').then(result => expect(result).toBe('5200'));
  });
});

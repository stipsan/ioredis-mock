import expect from 'expect';

import MockRedis from '../../src';

describe('incrby', () => {
  it('should increment an integer with passed increment', () => {
    const redis = new MockRedis({
      data: {
        user_next: '1',
      },
    });

    return redis.incrby('user_next', 10)
      .then(userNext => expect(userNext).toBe(11))
      .then(() => expect(redis.data.get('user_next')).toBe('11'));
  });
  it('should not increment if no increment is passed', () => {
    const redis = new MockRedis({
      data: {
        user_next: '1',
      },
    });

    return redis.incrby('user_next')
      .then(userNext => expect(userNext).toBe(1))
      .then(() => expect(redis.data.get('user_next')).toBe('1'));
  });
});

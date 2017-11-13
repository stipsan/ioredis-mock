import expect from 'expect';

import MockRedis from '../../src';

describe('decr', () => {
  it('should decrement an integer', () => {
    const redis = new MockRedis({
      data: {
        user_next: '2',
      },
    });

    return redis
      .decr('user_next')
      .then(userNext => expect(userNext).toBe(1))
      .then(() => expect(redis.data.get('user_next')).toBe('1'));
  });
});

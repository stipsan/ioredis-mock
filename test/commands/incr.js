import expect from 'expect';

import MockRedis from '../src';

describe('incr', () => {
  it('should increment an integer', () => {
    const redis = new MockRedis({
      data: {
        user_next: '1',
      },
    });

    return redis.incr('user_next').then(userNext => expect(userNext).toBe('2'));
  });
});

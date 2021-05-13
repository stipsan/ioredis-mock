import Redis from 'ioredis';

describe('incr', () => {
  it('should increment an integer', () => {
    const redis = new Redis({
      data: {
        user_next: '1',
      },
    });

    return redis
      .incr('user_next')
      .then((userNext) => expect(userNext).toBe(2))
      .then(() => expect(redis.data.get('user_next')).toBe('2'));
  });

  it('should set default value if not exists', () => {
    const redis = new Redis();

    return redis
      .incr('user_next')
      .then((userNext) => expect(userNext).toBe(1))
      .then(() => expect(redis.data.get('user_next')).toBe('1'));
  });
});

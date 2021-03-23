import MockRedis from 'ioredis';

describe('auth', () => {
  it('should return OK', () => {
    const redis = new MockRedis();

    return redis.auth('123456').then((status) => expect(status).toBe('OK'));
  });
});

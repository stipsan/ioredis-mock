import MockRedis from 'ioredis';

describe('bgsave', () => {
  it('should return OK', () => {
    const redis = new MockRedis();

    return redis.bgsave().then((status) => expect(status).toBe('OK'));
  });
});

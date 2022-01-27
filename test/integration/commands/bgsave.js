import Redis from 'ioredis';

describe('bgsave', () => {
  it('should return OK', () => {
    const redis = new Redis();

    return redis.bgsave().then((status) => expect(status).toBe('OK'));
  });
});

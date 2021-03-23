import MockRedis from 'ioredis';

describe('bgrewriteaof', () => {
  it('should return OK', () => {
    const redis = new MockRedis();

    return redis.bgrewriteaof().then((status) => expect(status).toBe('OK'));
  });
});

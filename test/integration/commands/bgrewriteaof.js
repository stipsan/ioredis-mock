import Redis from 'ioredis';

describe('bgrewriteaof', () => {
  it('should return OK', () => {
    const redis = new Redis();

    return redis.bgrewriteaof().then((status) => expect(status).toBe('OK'));
  });
});

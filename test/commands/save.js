import Redis from 'ioredis';

describe('save', () => {
  it('should return OK', () => {
    const redis = new Redis();

    return redis.save().then((status) => expect(status).toBe('OK'));
  });
});

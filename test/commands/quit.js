import MockRedis from 'ioredis';

describe('quit', () => {
  const redis = new MockRedis();
  it('should return OK', () =>
    redis.quit().then((res) => expect(res).toBe('OK')));
});

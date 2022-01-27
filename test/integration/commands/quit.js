import Redis from 'ioredis';

describe('quit', () => {
  const redis = new Redis();
  it('should return OK', () =>
    redis.quit().then((res) => expect(res).toBe('OK')));
});

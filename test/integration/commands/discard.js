import Redis from 'ioredis';

describe('discard', () => {
  it('should discard any batch queue ', () => {
    const redis = new Redis();

    redis.multi([
      ['incr', 'user_next'],
      ['incr', 'post_next'],
    ]);
    return redis.discard().then((result) => {
      expect(result).toBe('OK');
      expect(redis.batch).toBe(undefined);
    });
  });

  it('errors if you discard without starting a pipeline', () => {
    const redis = new Redis();

    return redis.discard().catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});

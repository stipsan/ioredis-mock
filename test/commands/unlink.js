import MockRedis from 'ioredis';

describe('unlink', () => {
  const redis = new MockRedis({
    data: {
      unlinkme: 'please',
      metoo: 'pretty please',
    },
  });
  it('should unlink/delete passed in keys', () =>
    redis
      .unlink('unlinkme', 'metoo')
      .then((status) => expect(status).toBe(2))
      .then(() => expect(redis.data.has('unlinkme')).toBe(false))
      .then(() => expect(redis.data.has('metoo')).toBe(false)));
  it('should return the number of keys unlinked', () =>
    redis.unlink('deleteme', 'metoo').then((status) => expect(status).toBe(0)));
});

import Redis from 'ioredis';

describe('del', () => {
  const redis = new Redis({
    data: {
      deleteme: 'please',
      metoo: 'pretty please',
    },
  });
  it('should delete passed in keys', () =>
    redis
      .del('deleteme', 'metoo')
      .then((status) => expect(status).toBe(2))
      .then(() => expect(redis.data.has('deleteme')).toBe(false))
      .then(() => expect(redis.data.has('metoo')).toBe(false)));
  it('return the number of keys removed', () =>
    redis.del('deleteme', 'metoo').then((status) => expect(status).toBe(0)));
});

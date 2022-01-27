import Redis from 'ioredis';

describe('dbsize', () => {
  it('should return how many keys exists in db', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
        bar: 'foo',
      },
    });

    return redis.dbsize().then((result) => expect(result).toBe(2));
  });
});

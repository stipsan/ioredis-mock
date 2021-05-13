import Redis from 'ioredis';

describe('hlen', () => {
  it('should return an empty array if there are no keys', () => {
    const redis = new Redis();

    return redis.hlen('foo').then((result) => expect(result).toBe(0));
  });

  it('should return all data keys', () => {
    const redis = new Redis({
      data: {
        foo: { bar: '1', baz: '2' },
      },
    });

    return redis.hlen('foo').then((result) => expect(result).toEqual(2));
  });
});

import Redis from 'ioredis';

describe('smembers', () => {
  it('should returns items in set as array', () => {
    const redis = new Redis({
      data: {
        foos: new Set(['bar', 'foo']),
      },
    });

    return redis
      .smembers('foos')
      .then((result) => expect(result.sort()).toEqual(['bar', 'foo']));
  });
  it("should return empty array if source don't exists", () => {
    const redis = new Redis();

    return redis.smembers('bars').then((result) => expect(result).toEqual([]));
  });
});

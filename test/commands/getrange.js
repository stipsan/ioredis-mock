import MockRedis from 'ioredis';

describe('getrange', () => {
  const redis = new MockRedis({
    data: {
      foo: 'This is a string',
    },
  });

  it('should return "This"', () =>
    redis.getrange('foo', 0, 3).then((result) => expect(result).toBe('This')));

  it('should return "ing"', () =>
    redis.getrange('foo', -3, -1).then((result) => expect(result).toBe('ing')));

  it('should return "This is a string"', () =>
    redis
      .getrange('foo', 0, -1)
      .then((result) => expect(result).toBe('This is a string')));

  it('should return "string"', () =>
    redis
      .getrange('foo', 10, 100)
      .then((result) => expect(result).toBe('string')));
});

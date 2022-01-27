import Redis from 'ioredis';

describe('ping', () => {
  it('should return PONG', () => {
    const redis = new Redis();

    return redis.ping().then((result) => expect(result).toBe('PONG'));
  });

  it('should return message', () => {
    const redis = new Redis();

    return redis
      .ping('Hello World!')
      .then((result) => expect(result).toBe('Hello World!'));
  });
});

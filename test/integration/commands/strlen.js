import Redis from 'ioredis';

describe('strlen', () => {
  it('should return 0 on keys that do not exist', () => {
    const redis = new Redis();

    return redis.strlen('nonexisting').then((result) => expect(result).toBe(0));
  });

  it('should return string length of keys that do exist', () => {
    const redis = new Redis({
      data: {
        mykey: 'Hello world',
      },
    });

    return redis.strlen('mykey').then((result) => expect(result).toBe(11));
  });
});

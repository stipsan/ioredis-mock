import MockRedis from 'ioredis';

describe('xlen', () => {
  it('should return the number of events in the stream', () => {
    const redis = new MockRedis({
      data: {
        stream: [
          ['3-0', ['key', 'val']],
          ['2-0', ['key', 'val']],
          ['1-0', ['key', 'val']],
        ],
      },
    });
    return redis.xlen('stream').then((len) => expect(len).toBe(3));
  });

  it('should return 0 for a non existing stream', () => {
    const redis = new MockRedis();
    return redis.xlen('non-existing').then((len) => expect(len).toBe(0));
  });
});

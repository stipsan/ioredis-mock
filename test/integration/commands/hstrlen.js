import Redis from 'ioredis';

describe('hstrlen', () => {
  it('should return 0 on keys that do not exist', () => {
    const redis = new Redis();

    return redis
      .hstrlen('nonexisting')
      .then((result) => expect(result).toBe(0));
  });

  it('should return 0 on fields that do not exist', () => {
    const redis = new Redis();

    return redis
      .hstrlen('nonexisting', 'foo')
      .then((result) => expect(result).toBe(0));
  });

  it('should return length on existing fields', () => {
    const redis = new Redis({
      data: {
        mykey: {
          foo: 'Hello world',
        },
      },
    });

    return redis
      .hstrlen('mykey', 'foo')
      .then((result) => expect(result).toBe(11));
  });
});

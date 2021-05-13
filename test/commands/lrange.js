import Redis from 'ioredis';

describe('lrange', () => {
  it('should return first 3 items', () => {
    const redis = new Redis({
      data: {
        foo: ['1', '2', '3', '4', '5'],
      },
    });

    return redis
      .lrange('foo', 0, 2)
      .then((res) => expect(res).toEqual(['1', '2', '3']));
  });

  it('should return last 3 items', () => {
    const redis = new Redis({
      data: {
        foo: ['1', '2', '3', '4', '5'],
      },
    });

    return redis
      .lrange('foo', -3, -1)
      .then((res) => expect(res).toEqual(['3', '4', '5']));
  });

  it('should return last all items on larger numbers', () => {
    const redis = new Redis({
      data: {
        foo: ['1', '2', '3', '4', '5'],
      },
    });

    return redis
      .lrange('foo', 0, 100)
      .then((res) => expect(res).toEqual(['1', '2', '3', '4', '5']));
  });

  it('should return empty array if out-of-range', () => {
    const redis = new Redis({
      data: {
        foo: ['1', '2', '3', '4', '5'],
      },
    });

    return redis.lrange('foo', 10, 100).then((res) => expect(res).toEqual([]));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .lrange('foo', 0, 2)
      .catch((err) =>
        expect(err.message).toBe('Key foo does not contain a list')
      );
  });
});

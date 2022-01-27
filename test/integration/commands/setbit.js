import Redis from 'ioredis';

describe('getbit', () => {
  it('should return old bit value of key', () => {
    const redis = new Redis({
      data: {
        foo: '@',
      },
    });
    return redis.setbit('foo', 1, 0).then((result) => expect(result).toBe(1));
  });

  it('should padd if offset out of range', () => {
    const redis = new Redis({});

    return redis
      .setbit('foo', 9, 1)
      .then((result) => expect(result).toBe(0))
      .then(() => expect(redis.data.get('foo')).toBe('\x00@'));
  });

  it('should ovveride bit value of key', () => {
    const redis = new Redis({
      data: {
        foo: 'bar',
      },
    });

    return redis
      .setbit('foo', 3, 1)
      .then((result) => expect(result).toBe(0))
      .then(() => expect(redis.data.get('foo')).toBe('rar'));
  });

  it('should create key if not exist', () => {
    const redis = new Redis({});

    return redis
      .setbit('foo', 1, 1)
      .then((result) => expect(result).toBe(0))
      .then(() => expect(redis.data.get('foo')).toBe('@'));
  });

  it('should throw if offset > 2^32', () => {
    const redis = new Redis();

    return redis.setbit('foo', 2 ** 32, 1).then(
      () => {
        throw new Error('Expected setbit to fail');
      },
      (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe(
          'ERR bit offset is not an integer or out of range'
        );
      }
    );
  });

  it('should throw if value is not 1 or 0', () => {
    const redis = new Redis();

    return redis.setbit('foo', 1, 10).then(
      () => {
        throw new Error('Expected setbit to fail');
      },
      (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('ERR bit is not an integer or out of range');
      }
    );
  });
});

import MockRedis from 'ioredis';

describe('append', () => {
  it('should append to exiting string and return new length', () => {
    const redis = new MockRedis({
      data: {
        mykey: 'Hello',
      },
    });

    return redis
      .append('mykey', ' World')
      .then((newLength) => expect(newLength).toBe(11))
      .then(() => expect(redis.data.get('mykey')).toBe('Hello World'));
  });
  it('should set empty string if key does not exist', () => {
    const redis = new MockRedis();

    return redis
      .append('mykey', ' World')
      .then((newLength) => expect(newLength).toBe(6))
      .then(() => expect(redis.data.get('mykey')).toBe(' World'));
  });
  it('should append to exiting buffer and return new length', () => {
    const redis = new MockRedis({
      data: {
        mykey: Buffer.from('Hello'),
      },
    });

    return redis
      .append('mykey', Buffer.from(' World'))
      .then((newLength) => expect(newLength).toBe(11))
      .then(() =>
        expect(redis.data.get('mykey')).toEqual(Buffer.from('Hello World'))
      );
  });
  it('should set empty buffer if key does not exist', () => {
    const redis = new MockRedis();
    const buffer = Buffer.from('Hello World');

    return redis
      .append('mykey', buffer)
      .then((newLength) => expect(newLength).toBe(buffer.length))
      .then(() => expect(redis.data.get('mykey')).toEqual(buffer));
  });
});

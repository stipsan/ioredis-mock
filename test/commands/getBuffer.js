import createBuffer from '../../src/buffer';
import MockRedis from 'ioredis';

describe('getBuffer', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis.getBuffer('foo').then((result) => expect(result).toBe(null));
  });

  it('should return value of key as buffer', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });

    return redis.getBuffer('foo').then((result) => {
      expect(Buffer.isBuffer(result)).toBeTruthy();
      expect(result).toEqual(Buffer.from('bar'));
    });
  });

  it('should return buffer values correctly', () => {
    const bufferVal = createBuffer('bar');
    const redis = new MockRedis({
      data: {
        foo: bufferVal,
      },
    });

    return redis
      .getBuffer('foo')
      .then((result) => expect(result.equals(bufferVal)).toBe(true));
  });
});

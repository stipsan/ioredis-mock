import createBuffer from '../../src/buffer';
import MockRedis from 'ioredis';

describe('rpoplpushBuffer', () => {
  it('should remove one item from the tail of the source list', () => {
    const redis = new MockRedis({
      data: {
        foo: ['foo', 'bar'],
      },
    });

    return redis
      .rpoplpushBuffer('foo', 'bar')
      .then(() => expect(redis.data.get('foo')).toEqual(['foo']));
  });

  it('should add one item to the head of the destination list', () => {
    const redis = new MockRedis({
      data: {
        foo: ['foo', 'bar'],
        bar: ['baz'],
      },
    });

    return redis
      .rpoplpushBuffer('foo', 'bar')
      .then(() => expect(redis.data.get('bar')).toEqual(['bar', 'baz']));
  });

  it('should return null if the source list does not exist', () => {
    const redis = new MockRedis();

    return redis
      .rpoplpushBuffer('foo', 'bar')
      .then((item) => expect(item).toEqual(null));
  });

  it('should return null if the source list is empty', () => {
    const redis = new MockRedis({
      data: {
        foo: [],
      },
    });

    return redis
      .rpoplpushBuffer('foo', 'bar')
      .then((item) => expect(item).toEqual(null));
  });

  it('should return the item', () => {
    const redis = new MockRedis({
      data: {
        foo: ['foo', 'bar'],
      },
    });

    return redis
      .rpoplpushBuffer('foo', 'bar')
      .then((item) => expect(item).toBe('bar'));
  });

  it('should return buffer values correctly', () => {
    const bufferVal = createBuffer('bar');
    const redis = new MockRedis({
      data: {
        foo: ['foo', bufferVal],
      },
    });

    return redis
      .rpoplpushBuffer('foo', bufferVal)
      .then((item) => expect(item).toBe(bufferVal));
  });

  it('should throw an exception if the source key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
        bar: [],
      },
    });

    return redis
      .rpoplpushBuffer('foo', 'bar')
      .catch((err) =>
        expect(err.message).toBe('Key foo does not contain a list')
      );
  });

  it('should throw an exception if the destination key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: [],
        bar: 'not a list',
      },
    });

    return redis
      .rpoplpushBuffer('foo', 'bar')
      .catch((err) =>
        expect(err.message).toBe('Key bar does not contain a list')
      );
  });
});

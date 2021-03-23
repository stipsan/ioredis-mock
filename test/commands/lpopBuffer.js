import MockRedis from 'ioredis';

describe('lpopBuffer', () => {
  it('should remove and return first element of list', () => {
    const redis = new MockRedis({
      data: {
        foo: ['3', '2', '1'],
      },
    });

    return redis
      .lpopBuffer('foo')
      .then((result) => expect(result).toEqual(Buffer.from('3')))
      .then(() => expect(redis.data.get('foo')).toEqual(['2', '1']));
  });

  it('should return buffer values correctly as buffer', () => {
    const bufferVal = Buffer.from('bar');
    const redis = new MockRedis({
      data: {
        foo: [bufferVal, '2', '1'],
      },
    });

    return redis
      .lpopBuffer('foo')
      .then((result) => {
        expect(Buffer.isBuffer(result)).toBeTruthy();
        expect(result).toEqual(bufferVal);
        return redis.lpopBuffer('foo');
      })
      .then((result) => {
        expect(Buffer.isBuffer(result)).toBeTruthy();
        expect(result).toEqual(Buffer.from('2'));
      });
  });

  it('should return null on empty list', () => {
    const redis = new MockRedis({
      data: {
        foo: [],
      },
    });

    return redis.lpopBuffer('foo').then((result) => expect(result).toBe(null));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .lpopBuffer('foo')
      .catch((err) =>
        expect(err.message).toBe('Key foo does not contain a list')
      );
  });
});

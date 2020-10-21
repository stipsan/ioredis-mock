import MockRedis from '../../src';

describe('rpop', () => {
  it('should remove and return last element of list', () => {
    const redis = new MockRedis({
      data: {
        foo: ['1', '2', '3'],
      },
    });

    return redis
      .rpop('foo')
      .then((result) => expect(result).toBe('3'))
      .then(() => expect(redis.data.get('foo')).toEqual(['1', '2']));
  });

  it('should return null on empty list', () => {
    const redis = new MockRedis({
      data: {
        foo: [],
      },
    });

    return redis.rpop('foo').then((result) => expect(result).toBe(null));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .rpop('foo')
      .catch((err) =>
        expect(err.message).toBe('Key foo does not contain a list')
      );
  });
});

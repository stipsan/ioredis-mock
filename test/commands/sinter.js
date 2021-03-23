import MockRedis from 'ioredis';

describe('sinter', () => {
  it('should return the members from the intersection of all the given sets', () => {
    const redis = new MockRedis({
      data: {
        key1: new Set(['a', 'b', 'c', 'd']),
        key2: new Set(['c']),
        key3: new Set(['a', 'c', 'e']),
      },
    });

    return redis
      .sinter('key1', 'key2', 'key3')
      .then((result) => expect(result).toEqual(['c']));
  });

  it('should throw an exception if one of the keys is not a set', () => {
    const redis = new MockRedis({
      data: {
        foo: new Set(),
        bar: 'not a set',
      },
    });

    return redis
      .sinter('foo', 'bar')
      .catch((err) =>
        expect(err.message).toBe('Key bar does not contain a set')
      );
  });

  it("should return empty array if sources don't exists", () => {
    const redis = new MockRedis();

    return redis
      .sinter('foo', 'bar')
      .then((result) => expect(result).toEqual([]));
  });
});

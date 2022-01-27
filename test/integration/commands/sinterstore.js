import Redis from 'ioredis';

describe('sinterstore', () => {
  it('should store the members from the intersection of all the given sets at dest and return the size', () => {
    const redis = new Redis({
      data: {
        key1: new Set(['a', 'b', 'c', 'd']),
        key2: new Set(['c']),
        key3: new Set(['a', 'c', 'e']),
      },
    });

    return redis
      .sinterstore('dest', 'key1', 'key2', 'key3')
      .then((count) => expect(count).toEqual(1))
      .then(() => redis.smembers('dest'))
      .then((result) => expect(result).toEqual(['c']));
  });

  it('should throw an exception if one of the keys is not a set', () => {
    const redis = new Redis({
      data: {
        foo: new Set(),
        bar: 'not a set',
      },
    });

    return expect(redis.sinterstore('foo', 'bar'))
      .rejects.toEqual(Error('Key bar does not contain a set'));
  });

  it("should compute empty array if sources don't exists", () => {
    const redis = new Redis();

    return redis
      .sinterstore('dest', 'foo', 'bar')
      .then((count) => expect(count).toEqual(0))
      .then(() => redis.smembers('dest'))
      .then((result) => expect(result).toEqual([]));
  });
});

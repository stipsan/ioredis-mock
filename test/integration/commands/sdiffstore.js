import Redis from 'ioredis';

describe('sdiffstore', () => {
  it('should store the difference between the first set and all the successive sets', () => {
    const redis = new Redis({
      data: {
        key1: new Set(['a', 'b', 'c', 'd']),
        key2: new Set(['c']),
        // key3: keys that do not exist are considered to be empty sets
        key4: new Set(['a', 'c', 'e']),
      },
    });

    return redis
      .sdiffstore('result', 'key1', 'key2', 'key3', 'key4')
      .then((count) => expect(count).toEqual(2))
      .then(() => redis.smembers('result'))
      .then((result) => expect(result).toEqual(['b', 'd']));
  });

  it('should throw an exception if the target key is not of a set', () => {
    const redis = new Redis({
      data: {
        foo: 'not a set',
      },
    });

    return expect(redis.sdiffstore('dest', 'foo', 'bar')).rejects.toEqual(
      Error('Key foo does not contain a set')
    );
  });

  it('should throw an exception if a member key contains something other than a set', () => {
    const redis = new Redis({
      data: {
        foo: new Set(),
        bar: 'not a set',
      },
    });

    return expect(redis.sdiffstore('dest', 'foo', 'bar')).rejects.toEqual(
      Error('Key bar does not contain a set')
    );
  });

  it("should return 0 if sources don't exists", () => {
    const redis = new Redis();

    return redis
      .sdiffstore('dest', 'foo', 'bar')
      .then((count) => expect(count).toEqual(0))
      .then(() => redis.smembers('dest'))
      .then((result) => expect(result).toEqual([]));
  });
});

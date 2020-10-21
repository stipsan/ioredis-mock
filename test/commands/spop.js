import Set from 'es6-set';

import MockRedis from '../../src';

describe('spop', () => {
  it('should return a random item', () => {
    const redis = new MockRedis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    });

    return redis.spop('myset').then((result) => {
      expect(result.constructor).toBe(String);
      expect(['one', 'two', 'three']).toContain(result);
      expect(redis.data.get('myset').size).toBe(2);
    });
  });

  it('should not return an array when count == set.size == 1', () => {
    const redis = new MockRedis({
      data: {
        myset: new Set(['one']),
      },
    });

    return redis.spop('myset').then((result) => {
      expect(result.constructor).toBe(String);
      expect(result).toBe('one');
      expect(redis.data.get('myset').size).toBe(0);
    });
  });

  it('should return random unique items', () => {
    const redis = new MockRedis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    });

    return redis.spop('myset', 2).then((results) => {
      expect(['one', 'two', 'three']).toContain(results[0]);
      expect(['one', 'two', 'three']).toContain(results[1]);
      expect(redis.data.get('myset').size).toBe(1);
    });
  });

  it('should return all items if positive count is bigger than set', () => {
    const redis = new MockRedis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    });

    return redis.spop('myset', 5).then((results) => {
      expect(results).toEqual(['one', 'two', 'three']);
      expect(redis.data.get('myset').size).toBe(0);
    });
  });

  it('should return null if set is empty', () => {
    const redis = new MockRedis();

    return redis.spop('myset').then((result) => expect(result).toBe(null));
  });

  it('should return undefined if count is 0', () => {
    const redis = new MockRedis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    });

    return redis
      .spop('myset', 0)
      .then((result) => expect(result).toBe(undefined));
  });

  it('should throw an exception if the key contains something other than a set', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a set',
      },
    });

    return redis
      .spop('foo')
      .catch((err) =>
        expect(err.message).toBe('Key foo does not contain a set')
      );
  });

  it('should throw an exception if count is not an integer', () => {
    const redis = new MockRedis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    });

    return redis
      .spop('myset', 'not an integer')
      .catch((err) =>
        expect(err.message).toBe('ERR value is not an integer or out of range')
      );
  });

  it('should throw an exception if count is out of range', () => {
    const redis = new MockRedis({
      data: {
        myset: new Set(['one', 'two', 'three']),
      },
    });

    return redis
      .spop('myset', -10)
      .catch((err) =>
        expect(err.message).toBe('ERR value is not an integer or out of range')
      );
  });
});

import expect from 'expect';

import MockRedis from '../../src';

describe('spop', () => {
  it('should return a random item', () => {
    const redis = new MockRedis({
      data: {
        myset: ['one', 'two', 'three'],
      },
    });

    return redis.spop('myset')
      .then((result) => {
        expect(['one', 'two', 'three']).toInclude(result);
        expect(redis.data.get('myset').length).toBe(2);
      });
  });

  it('should return random unique items', () => {
    const redis = new MockRedis({
      data: {
        myset: ['one', 'two', 'three'],
      },
    });

    return redis.spop('myset', 2)
      .then((results) => {
        expect(['one', 'two', 'three']).toInclude(results[0]);
        expect(['one', 'two', 'three']).toInclude(results[1]);
        expect(redis.data.get('myset').length).toBe(1);
      });
  });

  it('should return all items if positive count is bigger than set', () => {
    const redis = new MockRedis({
      data: {
        myset: ['one', 'two', 'three'],
      },
    });

    return redis.spop('myset', 5)
      .then((results) => {
        expect(results).toEqual(['one', 'two', 'three']);
        expect(redis.data.get('myset').length).toBe(0);
      });
  });

  it('should return null if set is empty', () => {
    const redis = new MockRedis();

    return redis.spop('myset').then(result => expect(result).toBe(null));
  });

  it('should throw an exception if the key contains something other than a set', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a set',
      },
    });

    return redis.spop('foo')
      .catch(err => expect(err.message).toBe('Key foo does not contain a set'));
  });
});

import expect from 'expect';

import MockRedis from '../../src';

describe('lpushx', () => {
  it('should add the values to the list in the correct order', () => {
    const redis = new MockRedis({
      data: {
        foo: ['2'],
      },
    });

    return redis
      .lpushx('foo', 1)
      .then(() => expect(redis.data.get('foo')).toEqual(['1', '2']));
  });

  it('should return the new length of the list', () => {
    const redis = new MockRedis({
      data: {
        foo: ['2'],
      },
    });

    return redis.lpushx('foo', 1).then((result) => expect(result).toBe(2));
  });

  it('should return 0 if list does not exist', () => {
    const redis = new MockRedis();

    return redis.lpushx('foo', 1).then((result) => expect(result).toBe(0));
  });
});

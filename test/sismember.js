import expect from 'expect';

import MockRedis from '../src';

describe('sismember', () => {
  it('should check if item exists in list', () => {
    const redis = new MockRedis({
      data: {
        foos: ['foo', 'bar'],
      },
    });

    return redis.sismember('foos', 'foo').then(result => expect(result).toBe(true))
                .then(() => redis.sismember('foos', 'foobar'))
                .then(result => expect(result).toBe(false));
  });
});

import expect from 'expect';
import Set from 'es6-set';

import MockRedis from '../../src';

describe('sismember', () => {
  it('should check if item exists in set', () => {
    const redis = new MockRedis({
      data: {
        foos: new Set(['foo', 'bar']),
      },
    });

    return redis
      .sismember('foos', 'foo')
      .then(result => expect(result).toBe(1))
      .then(() => redis.sismember('foos', 'foobar'))
      .then(result => expect(result).toBe(0));
  });
});

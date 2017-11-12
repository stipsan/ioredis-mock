import expect from 'expect';
import Set from 'es6-set';

import MockRedis from '../../src';

describe('smembers', () => {
  it('should returns items in set as array', () => {
    const redis = new MockRedis({
      data: {
        foos: new Set(['bar', 'foo']),
      },
    });

    return redis.smembers('foos').then(result => expect(result.sort()).toEqual(['bar', 'foo']));
  });
  it('should return empty array if source don\'t exists', () =>
    redis.smembers('bars').then(result => expect(result).toEqual([]))
  )
});

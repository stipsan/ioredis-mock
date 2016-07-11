import expect from 'expect';

import MockRedis from '../../src';

describe('smembers', () => {
  it('should returns items in list as array', () => {
    const redis = new MockRedis({
      data: {
        foos: ['foo', 'bar'],
      },
    });

    return redis.smembers('foos').then(result => expect(result).toEqual(['foo', 'bar']));
  });
});

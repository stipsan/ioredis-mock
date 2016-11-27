import expect from 'expect';

import MockRedis from '../../src';

describe('duplicate', () => {
  it('should return the redis instance', () => {
    const redis = new MockRedis({});

    return expect(redis.duplicate()).toEqual(redis);
  });
});

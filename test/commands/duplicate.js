import expect from 'expect';

import MockRedis from '../../src';

describe('duplicate', () => {
  it('should return the redis instance', () => {
    const redis = new MockRedis({});

    return redis.duplicate().then(r => expect(r).toEqual(redis));
  });
});

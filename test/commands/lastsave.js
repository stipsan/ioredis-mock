import expect from 'expect';

import MockRedis from '../../src';

describe('lastsave', () => {
  it('should return unix time since last save', () => {
    const redis = new MockRedis();

    return redis.lastsave().then(result =>
      expect(result).toBeLessThanOrEqualTo(Math.floor(new Date().getTime() / 1000))
    );
  });
});

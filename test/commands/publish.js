import expect from 'expect';

import MockRedis from '../../src';

describe('publish', () => {
  const redis = new MockRedis();
  it('should return 0 when publishing', () =>
    redis.publish('emails', 'clark@daily.planet').then(subscribers => expect(subscribers).toBe(0))
  );
});

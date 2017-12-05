import expect from 'expect';

import MockRedis from '../../src';

describe('subscribe', () => {
  const redis = new MockRedis();
  it('should return number of subscribed channels', () =>
    redis.subscribe('news', 'music').then(subNum => expect(subNum).toBe(2)));
});

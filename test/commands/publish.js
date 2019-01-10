import expect from 'expect';

import MockRedis from '../../src';

describe('publish', () => {
  it('should return 0 when publishing without subscribers', () => {
    const redis = new MockRedis();
    return redis
      .publish('emails', 'clark@daily.planet')
      .then(subscribers => expect(subscribers).toBe(0));
  });

  it('should return 1 when publishing with a single subscriber', () => {
    const redis = new MockRedis();
    redis.subscribe('emails');
    // if subscribe was implemented correctly,
    // redis would be in subscriber mode and we could not execute publish
    // and this testcase needed to be refactored
    return redis
      .publish('emails', 'clark@daily.planet')
      .then(subscribers => expect(subscribers).toBe(1));
  });

  it('should publish a message, which can be received by a previous subscribe', done => {
    const redis = new MockRedis();
    redis.on('message', (channel, message) => {
      expect(channel).toBe('emails');
      expect(message).toBe('clark@daily.planet');
      done();
    });
    redis.subscribe('emails');
    // if subscribe was implemented correctly,
    // redis would be in subscriber mode and we could not execute publish
    // and this testcase needed to be refactored
    redis.publish('emails', 'clark@daily.planet');
  });
});

import expect from 'expect';

import MockRedis from '../../src';

describe('unsubscribe', () => {
  it('should return 0 when no arguments are given', () => {
    const redis = new MockRedis();
    // unsubscribe returns the number of open channels (like subscribe)
    // unsubscribe() should always return 0, as we have unsubscribed from all channels
    return redis.unsubscribe().then(subNum => expect(subNum).toBe(0));
  });

  it('should return 0 when no arguments are given after being subscribed to a channel', () => {
    const redis = new MockRedis();
    return redis
      .subscribe('first')
      .then(subNum => expect(subNum).toBe(1))
      .then(() => redis.unsubscribe().then(subNum => expect(subNum).toBe(0)));
  });

  it('should return the number of subscribed channels when unsubscribing from a subscribed channel', () => {
    const redis = new MockRedis();
    return redis
      .subscribe('first', 'second', 'third')
      .then(subNum => expect(subNum).toBe(3))
      .then(() =>
        redis
          .unsubscribe('second', 'third')
          .then(subNum => expect(subNum).toBe(1))
      );
  });
});

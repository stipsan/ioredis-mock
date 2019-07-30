import expect from 'expect';

import MockRedis from '../../src';

describe('psubscribe', () => {
  it('should return number of subscribed channels', () => {
    const redis = new MockRedis();
    return redis
      .psubscribe('news.*', 'music.*')
      .then(subNum => expect(subNum).toBe(2));
  });

  it('should return number of subscribed channels when calling subscribe twice', () => {
    const redis = new MockRedis();
    return redis
      .psubscribe('first.*')
      .then(subNum => expect(subNum).toBe(1))
      .then(() =>
        redis.psubscribe('second.*').then(subNum => expect(subNum).toBe(2))
      );
  });

  it('should not incremented number of subscribed channels when subscribing to same channel multiple times', () => {
    const redis = new MockRedis();
    return redis
      .psubscribe('channel.*')
      .then(subNum => expect(subNum).toBe(1))
      .then(() =>
        redis.psubscribe('channel.*').then(subNum => expect(subNum).toBe(1))
      );
  });

  it('should reject non-subscribe commands when having at least one open subscription', () => {
    const redis = new MockRedis();
    return redis.psubscribe('channel').then(() =>
      redis
        .get('key')
        .then(() => {
          throw new Error('get should fail when in subscriber mode');
        })
        .catch(error =>
          expect(error.message).toBe(
            'Connection in subscriber mode, only subscriber commands may be used'
          )
        )
    );
  });
});

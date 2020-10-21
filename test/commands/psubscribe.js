import MockRedis from '../../src';

describe('psubscribe', () => {
  it('should return number of subscribed channels', () => {
    const redis = new MockRedis();
    return redis
      .psubscribe('news.*', 'music.*')
      .then((subNum) => expect(subNum).toBe(2));
  });

  it('should return number of subscribed channels when calling subscribe twice', () => {
    const redis = new MockRedis();
    return redis
      .psubscribe('first.*')
      .then((subNum) => expect(subNum).toBe(1))
      .then(() =>
        redis.psubscribe('second.*').then((subNum) => expect(subNum).toBe(2))
      );
  });

  it('should not incremented number of subscribed channels when subscribing to same channel multiple times', () => {
    const redis = new MockRedis();
    return redis
      .psubscribe('channel.*')
      .then((subNum) => expect(subNum).toBe(1))
      .then(() =>
        redis.psubscribe('channel.*').then((subNum) => expect(subNum).toBe(1))
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
        .catch((error) =>
          expect(error.message).toBe(
            'Connection in subscriber mode, only subscriber commands may be used'
          )
        )
    );
  });

  it('should allow multiple instances to subscribe to the same channel', () => {
    const redisOne = new MockRedis();
    const redisTwo = redisOne.createConnectedClient();

    return Promise.all([
      redisOne.psubscribe('first.*', 'second.*'),
      redisTwo.psubscribe('first.*'),
    ]).then(([oneResult, twoResult]) => {
      expect(oneResult).toEqual(2);
      expect(twoResult).toEqual(1);
      let promiseOneFulfill;
      let PromiseTwoFulfill;
      const promiseOne = new Promise((f) => {
        promiseOneFulfill = f;
      });
      const promiseTwo = new Promise((f) => {
        PromiseTwoFulfill = f;
      });

      redisOne.on('message', promiseOneFulfill);
      redisTwo.on('message', PromiseTwoFulfill);

      redisOne.createConnectedClient().publish('first.test', 'blah');

      return Promise.all([promiseOne, promiseTwo]);
    });
  });

  it('should toggle subscriberMode correctly', () => {
    const redis = new MockRedis();
    return redis
      .psubscribe('test.*')
      .then(() => {
        expect(redis.subscriberMode).toBe(true);
        return redis.punsubscribe('test.*');
      })
      .then(() => {
        expect(redis.subscriberMode).toBe(false);
        // this next part is just to make sure our tests go through the code path
        // where we have had subscriptions but currently have none
        return redis.psubscribe();
      });
  });
});

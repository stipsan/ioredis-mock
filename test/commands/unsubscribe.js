import Redis from 'ioredis';

describe('unsubscribe', () => {
  it('should return 0 when no arguments are given', () => {
    const redis = new Redis();
    // unsubscribe returns the number of open channels (like subscribe)
    // unsubscribe() should always return 0, as we have unsubscribed from all channels
    return redis.unsubscribe().then((subNum) => expect(subNum).toBe(0));
  });

  it('should return 0 when no arguments are given after being subscribed to a channel', () => {
    const redis = new Redis();
    return redis
      .subscribe('first')
      .then((subNum) => expect(subNum).toBe(1))
      .then(() => redis.unsubscribe().then((subNum) => expect(subNum).toBe(0)));
  });

  it('should return the number of subscribed channels when unsubscribing from a subscribed channel', () => {
    const redis = new Redis();
    return redis
      .subscribe('first', 'second', 'third')
      .then((subNum) => expect(subNum).toBe(3))
      .then(() =>
        redis
          .unsubscribe('second', 'third')
          .then((subNum) => expect(subNum).toBe(1))
      );
  });

  it('should ignore a request to unsubscribe from a channel not subscribed to', () => {
    const redis = new Redis();
    return redis
      .subscribe('first')
      .then(() => redis.unsubscribe('second'))
      .then((subNum) => expect(subNum).toBe(1));
  });

  it('should unsubscribe only one instance when more than one is subscribed to a channel', () => {
    const redisOne = new Redis();
    const redisTwo = new Redis();

    return Promise.all([
      redisOne.subscribe('first'),
      redisTwo.subscribe('first', 'second'),
    ])
      .then(() => redisTwo.unsubscribe('first'))
      .then((result) => {
        expect(result).toEqual(1);

        let promiseFulfill;
        const promise = new Promise((f) => {
          promiseFulfill = f;
        });

        redisOne.on('message', promiseFulfill);

        redisOne.duplicate().publish('first', 'TEST');

        return promise;
      });
  });

  it('should not alter parent instance when connected client unsubscribes', () => {
    const redisOne = new Redis();
    const redisTwo = new Redis();
    return redisOne
      .subscribe('first')
      .then(() => redisTwo.unsubscribe('first'))
      .then((subNum) => {
        expect(subNum).toBe(0);
        return redisTwo.publish('first', '');
      })
      .then((subNum) => {
        expect(subNum).toBe(1);
      });
  });
});

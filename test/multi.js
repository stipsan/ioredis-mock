import expect from 'expect';

import MockRedis from '../src';

describe('multi', () => {
  it('should setup a batch queue that can be passed to exec', () => {
    const redis = new MockRedis();

    redis.multi([['incr', 'user_next'], ['incr', 'post_next']]);
    expect(redis.batch).toBeA('object');
    expect(redis.batch.batch).toBeA('array');
    expect(redis.batch.batch.length).toBe(2);
    expect(redis.batch.batch[0]).toBeA('function');
    expect(redis.batch.batch[1]).toBeA('function');
  });

  it('allows for pipelining methods', () => {
    const redis = new MockRedis();

    return redis
      .pipeline()
      .incr('user_next')
      .incr('post_next')
      .exec()
      .then(results => {
        expect(results).toBeA('array');
        expect(results.length).toBe(2);
        expect(results[0]).toEqual([null, 1]);
        expect(results[1]).toEqual([null, 1]);
      });
  });

  it('should increment _transactions', () => {
    const redis = new MockRedis();
    const commands = [['incr', 'user_next'], ['incr', 'post_next']];
    redis.multi(commands);
    // eslint-disable-next-line no-underscore-dangle
    expect(redis.batch._transactions).toEqual(commands.length + 1);
  });

  it('errors if you exec without starting a pipeline', () => {
    const redis = new MockRedis();

    return redis.exec().catch(err => {
      expect(err).toBeA(Error);
    });
  });
});

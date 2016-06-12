import expect from 'expect';

import MockRedis from '../src';

describe('multi', () => {
  it('should setup a batch queue that can be passed to exec', () => {
    const redis = new MockRedis();

    redis.multi([
      ['incr', 'user_next'],
      ['incr', 'post_next'],
    ]);
    expect(redis.batch).toBeA('array');
    expect(redis.batch.length).toBe(2);
    expect(redis.batch[0]).toBeA('function');
    expect(redis.batch[1]).toBeA('function');
  });
});

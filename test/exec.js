import expect from 'expect';

import MockRedis from '../src';

describe('exec', () => {
  it('should resolve Promise.all after all operations is done', () => {
    const redis = new MockRedis({
      data: {
        user_next: '1',
        post_next: '1',
      },
    });

    return redis.multi([
      ['incr', 'user_next'],
      ['incr', 'post_next'],
    ]).exec().then(results => expect(results).toEqual([[null, '2'], [null, '2']]));
  });
});

import expect from 'expect';

import MockRedis from '../../src';

describe('discard', () => {
  it('should discard any batch queue ', () => {
    const redis = new MockRedis();

    redis.multi([
      ['incr', 'user_next'],
      ['incr', 'post_next'],
    ]);
    return redis.discard().then((result) => {
      expect(result).toBe('OK');
      expect(redis.batch).toBe(undefined);
    });
  });

  it('errors if you discard without starting a pipeline', function() {
      const redis = new MockRedis();

      return redis.discard()
      .catch( (err) => {
          expect(err).toBeA(Error);
      });
  });
});

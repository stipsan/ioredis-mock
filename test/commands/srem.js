import expect from 'expect';
import Set from 'es6-set';

import MockRedis from '../../src';

describe('srem', () => {
  const redis = new MockRedis({
    data: {
      foos: new Set(['bar', 'foo', 'baz']),
    },
  });
  it('should remove 1 item from set', () =>
    redis
      .srem('foos', 'bar')
      .then(status => expect(status).toBe(1))
      .then(() => expect(redis.data.get('foos').has('bar')).toBe(false)));
  it('should remove 2 items from set', () =>
    redis
      .srem('foos', 'foo', 'baz', 'none existent')
      .then(status => expect(status).toBe(2))
      .then(() => {
        expect(redis.data.get('foos').has('bar')).toBe(false);
        expect(redis.data.get('foos').has('baz')).toBe(false);
      }));
  it("should return 0 if source don't exists", () =>
    redis.srem('bars', 'foo').then(status => expect(status).toBe(0)));
});

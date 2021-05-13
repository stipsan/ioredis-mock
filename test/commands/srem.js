import Redis from 'ioredis';

describe('srem', () => {
  const redis = new Redis({
    data: {
      foos: new Set(['bar', 'foo', 'baz', 'bazooka']),
    },
  });
  it('should remove 1 item from set', () =>
    redis
      .srem('foos', 'bar')
      .then((status) => expect(status).toBe(1))
      .then(() => expect(redis.data.get('foos').has('bar')).toBe(false)));
  it('should remove 2 items from set', () =>
    redis
      .srem('foos', 'foo', 'baz', 'none existent')
      .then((status) => expect(status).toBe(2))
      .then(() => {
        expect(redis.data.get('foos').has('bar')).toBe(false);
        expect(redis.data.get('foos').has('baz')).toBe(false);
      }));
  it("should return 0 if source don't exists", () =>
    redis.srem('bars', 'foo').then((status) => expect(status).toBe(0)));
});

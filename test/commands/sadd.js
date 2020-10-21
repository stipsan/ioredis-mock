import MockRedis from '../../src';

describe('sadd', () => {
  it('should add 1 item to set', () => {
    const redis = new MockRedis();

    return redis
      .sadd('foos', 'bar')
      .then((status) => expect(status).toBe(1))
      .then(() => expect(redis.data.get('foos').has('bar')).toBe(true));
  });
  it('should add 2 items to set', () => {
    const redis = new MockRedis();

    return redis
      .sadd('foos', 'foo', 'baz')
      .then((status) => expect(status).toBe(2))
      .then(() => {
        expect(redis.data.get('foos').has('foo')).toBe(true);
        expect(redis.data.get('foos').has('baz')).toBe(true);
        expect(redis.data.get('foos').has('bar')).toBe(false);
      });
  });
  it('should not increase length when adding duplicates', () => {
    const redis = new MockRedis();

    return redis
      .sadd('key', 'value', 'value')
      .then((status) => expect(status).toBe(1))
      .then(() => expect(redis.data.get('key').has('value')).toBe(true));
  });
});

import Promise from 'bluebird';
import Redis from 'ioredis';

describe('psetex', () => {
  it('should set value and expire', () => {
    const redis = new Redis();
    return redis
      .psetex('foo', 100, 'bar')
      .then((status) => expect(status).toBe('OK'))
      .then(() => {
        expect(redis.data.get('foo')).toBe('bar');
        expect(redis.expires.has('foo')).toBe(true);
      })
      .then(() => Promise.delay(200))
      .then(() => redis.get('foo'))
      .then((result) => expect(result).toBe(null));
  });
});

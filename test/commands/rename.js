import expect from 'expect';

import MockRedis from '../../src';

describe('rename', () => {
  it('should rename a key to newkey', () => {
    const redis = new MockRedis({
      data: {
        foo: 'baz',
      },
    });
    return redis
      .rename('foo', 'bar')
      .then(status => expect(status).toBe('OK'))
      .then(() => {
        expect(redis.data.has('foo')).toBe(false);
        expect(redis.data.get('bar')).toBe('baz');
      });
  });
});

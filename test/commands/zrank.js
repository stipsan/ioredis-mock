import Map from 'es6-map';

import MockRedis from '../../src';

describe('zrank', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
    ]),
  };

  it('should do nothing if key does not exist', () => {
    const redis = new MockRedis({ data: {} });

    return redis
      .zrank('foo', 'not-exist')
      .then((status) => expect(status).toBe(null))
      .then(() => expect(redis.data.has('foo')).toBe(false));
  });

  it('should return null if not found', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrank('foo', 'not-found')
      .then((status) => expect(status).toBe(null));
  });

  it('should return found index', () => {
    const redis = new MockRedis({ data });

    return redis.zrank('foo', 'third').then((status) => expect(status).toBe(2));
  });
});

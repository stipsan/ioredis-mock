import Map from 'es6-map';
import expect from 'expect';

import MockRedis from '../../src';

describe('zrevrank', () => {
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
      .zrevrank('foo', 'not-exist')
      .then(status => expect(status).toBe(null))
      .then(() => expect(redis.data.has('foo')).toBe(false));
  });

  it('should return null if not found', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrevrank('foo', 'not-found')
      .then(status => expect(status).toBe(null));
  });

  it('should return found index', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrevrank('foo', 'first')
      .then(status => expect(status).toBe(2));
  });
});

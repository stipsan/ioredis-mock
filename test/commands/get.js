import expect from 'expect';

import MockRedis from '../src';

describe('get', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis.get('foo').then(result => expect(result).toBe(null));
  });

  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });

    return redis.get('foo').then(result => expect(result).toBe('bar'));
  });
});

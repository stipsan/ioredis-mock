import expect from 'expect';

import MockRedis from '../../src';

describe('renamenx', () => {
  it('should return integer 1 on key rename', () => {
    const redis = new MockRedis({
      data: {
        foo: 'baz',
      },
    });
    return redis.renamenx('foo', 'bar').then(status => expect(status).toBe('1'))
      .then(() => expect(redis.data).toEqual({ bar: 'baz' }));
  });

  it('should return integer 0 if new key already exist', () => {
    const redis = new MockRedis({
      data: {
        foo: 'baz',
        bar: 'foobar',
      },
    });
    return redis.renamenx('foo', 'bar').then(status => expect(status).toBe('0'))
      .then(() => expect(redis.data).toEqual({ foo: 'baz', bar: 'foobar' }));
  });
});

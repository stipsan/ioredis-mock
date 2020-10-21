import expect from 'expect';

import MockRedis from '../../src';

describe('exists', () => {
  const redis = new MockRedis({
    data: {
      foo: '1',
      bar: '1',
    },
  });
  it('should return how many keys exists', () =>
    redis.exists('foo', 'bar', 'baz').then((status) => expect(status).toBe(2)));
});

import expect from 'expect';

import MockRedis from '../../src';

describe('hexists', () => {
  context('hash exists', () => {
    const redis = new MockRedis({
      data: {
        foo: { bar: 'baz' },
      },
    });

    it('should return 1 if key exists in hash map', () =>
      redis.hexists('foo', 'bar').then(status => expect(status).toBe(1))
    );

    it('should return 0 if key not exists in hash map', () =>
      redis.hexists('foo', 'baz').then(status => expect(status).toBe(0))
    );
  });

  context('hash doesn\'t exist', () => {
    const redis = new MockRedis();

    it('should return 0', () =>
      redis.hexists('foo', 'baz').then(status => expect(status).toBe(0))
    );
  });
});

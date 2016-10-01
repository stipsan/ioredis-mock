import expect from 'expect';

import MockRedis from '../../src';

describe('srem', () => {
  const redis = new MockRedis({
    data: {
      foos: ['bar', 'foo', 'baz'],
    },
  });
  it('should remove 1 item from list', () =>
    redis.srem('foos', 'bar').then(status => expect(status).toBe(1))
      .then(() => expect(redis.data.get('foos')).toNotInclude('bar'))
  );
  it('should remove 2 items from list', () =>
    redis.srem('foos', 'foo', 'baz').then(status => expect(status).toBe(2))
      .then(() => expect(redis.data.get('foos')).toNotInclude('foo').toNotInclude('baz'))
  );
});

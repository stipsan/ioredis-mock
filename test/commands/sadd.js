import expect from 'expect';

import MockRedis from '../../src';

describe('sadd', () => {
  const redis = new MockRedis();
  it('should add 1 item to list', () =>
    redis.sadd('foos', 'bar').then(status => expect(status).toBe(1))
         .then(() => expect(redis.data.foos).toInclude('bar'))
  );
  it('should add 2 items to list', () =>
    redis.sadd('foos', 'foo', 'baz').then(status => expect(status).toBe(2))
         .then(() => expect(redis.data.foos).toInclude('foo').toInclude('baz'))
  );
});

import expect from 'expect';

import MockRedis from '../../src';

describe('bgrewriteaof', () => {
  it('should return OK', () => {
    const redis = new MockRedis();

    return redis.bgrewriteaof().then(status => expect(status).toBe('OK'));
  });
});

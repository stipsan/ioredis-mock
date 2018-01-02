import expect from 'expect';

import MockRedis from '../../src';

describe('unsubscribe', () => {
  const redis = new MockRedis();
  it('should return OK', () =>
    redis.unsubscribe().then(res => expect(res).toBe('OK')));
});

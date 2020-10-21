import expect from 'expect';

import MockRedis from '../../src';

describe('bgsave', () => {
  it('should return OK', () => {
    const redis = new MockRedis();

    return redis.bgsave().then((status) => expect(status).toBe('OK'));
  });
});

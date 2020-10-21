import expect from 'expect';

import MockRedis from '../../src';

describe('flushall', () => {
  const redis = new MockRedis({
    data: {
      deleteme: 'please',
      metoo: 'pretty please',
    },
  });
  it('should empty current db', () =>
    redis
      .flushall()
      .then((status) => expect(status).toBe('OK'))
      .then(() => expect(redis.data.keys().length).toBe(0)));
  it('should empty every db');
});

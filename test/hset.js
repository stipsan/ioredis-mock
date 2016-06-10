import expect from 'expect';

import MockRedis from '../src';

describe('hset', () => {
  const redis = new MockRedis({
    data: {
      emails: {},
    },
  });
  it('should return OK when setting a hash key', () =>
    redis.hset('emails', 'clark@daily.planet', '1').then(status => expect(status).toBe('OK'))
  );
});

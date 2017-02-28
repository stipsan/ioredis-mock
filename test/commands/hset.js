import expect from 'expect';

import MockRedis from '../../src';

describe('hset', () => {
  const redis = new MockRedis();

  it('should return 1 when setting a new field', () =>
    redis.hset('user:1', 'email', 'clark@daily.planet')
      .then(status => expect(status).toBe(1))
      .then(() => expect(redis.data.get('user:1')).toEqual({ email: 'clark@daily.planet' }))
  );

  it('should return 0 when overwriting existing field', () =>
    redis.hset('user:1', 'email', 'bruce@wayne.enterprises')
      .then(status => expect(status).toBe(0))
      .then(() => expect(redis.data.get('user:1')).toEqual({ email: 'bruce@wayne.enterprises' }))
  );
});

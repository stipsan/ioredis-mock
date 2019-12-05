import expect from 'expect';

import MockRedis from '../../src';

describe('hset', () => {
  const redis = new MockRedis();

  it('should return 1 when setting a new field', () =>
    redis
      .hset('user:1', 'email', 'clark@daily.planet')
      .then(status => expect(status).toBe(1))
      .then(() =>
        expect(redis.data.get('user:1')).toEqual({
          email: 'clark@daily.planet',
        })
      ));

  it('should return 0 when overwriting existing field', () =>
    redis
      .hset('user:1', 'email', 'bruce@wayne.enterprises')
      .then(status => expect(status).toBe(0))
      .then(() =>
        expect(redis.data.get('user:1')).toEqual({
          email: 'bruce@wayne.enterprises',
        })
      ));

  it('should let you set multiple hash map keys and values in a single command', () => {
    const hash = { id: '2', email: 'bruce@wayne.enterprises' };
    return redis
      .hset('user:2', 'id', '2', 'email', 'bruce@wayne.enterprises')
      .then(status => expect(status).toBe(2))
      .then(() => expect(redis.data.get('user:2')).toEqual(hash));
  });

  it('should let you set multiple hash map keys and values with an object', () => {
    const hash = { id: '3', email: 'bruce@wayne.enterprises' };
    return redis
      .hset('user:3', hash)
      .then(status => expect(status).toBe(1))
      .then(() => expect(redis.data.get('user:3')).toEqual(hash));
  });
});

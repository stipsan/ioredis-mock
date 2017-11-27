import expect from 'expect';

import MockRedis from '../../src';

describe('hmset', () => {
  it('should let you set multiple hash map keys and values in a single command', () => {
    const redis = new MockRedis();
    const hash = { id: '1', email: 'bruce@wayne.enterprises' };
    return redis
      .hmset('user:1', 'id', '1', 'email', 'bruce@wayne.enterprises')
      .then(status => expect(status).toBe('OK'))
      .then(() => expect(redis.data.get('user:1')).toEqual(hash));
  });

  it('should let you set multiple hash map keys and values with an object', () => {
    const redis = new MockRedis();
    const hash = { id: '1', email: 'bruce@wayne.enterprises' };
    return redis
      .hmset('user:1', hash)
      .then(status => expect(status).toBe('OK'))
      .then(() => expect(redis.data.get('user:1')).toEqual(hash));
  });
});

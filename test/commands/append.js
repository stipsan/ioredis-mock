import expect from 'expect';

import MockRedis from '../../src';

describe('append', () => {
  it('should append to exiting string and return new length', () => {
    const redis = new MockRedis({
      data: {
        mykey: 'Hello',
      },
    });

    return redis.append('mykey', ' World').then(newLength => expect(newLength).toBe('11'))
                .then(() => expect(redis.data.mykey).toBe('Hello World'));
  });
  it('should set empty string if key does not exist', () => {
    const redis = new MockRedis();

    return redis.append('mykey', ' World').then(newLength => expect(newLength).toBe('6'))
                .then(() => expect(redis.data.mykey).toBe(' World'));
  });
});

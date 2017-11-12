import expect from 'expect';

import MockRedis from '../../src';

describe('hsetnx', () => {
  it('should set a key in a hash map if it does not exist already', () => {
    const redis = new MockRedis();
    return redis
      .hsetnx('emails', 'bruce@wayne.enterprises', '1')
      .then(status => expect(status).toBe(1))
      .then(() => {
        expect(redis.data.get('emails')['bruce@wayne.enterprises']).toBe(
          '1',
          'hash map value failed to persist'
        );
        return redis.hsetnx('emails', 'bruce@wayne.enterprises', '2');
      })
      .then(status =>
        expect(status).toBe(0, 'hsetnx no-op failed on existing key')
      )
      .then(() => {
        expect(redis.data.get('emails')['bruce@wayne.enterprises']).toBe(
          '1',
          'existing hash map value was overwritten'
        );
      });
  });
});

import expect from 'expect';

import MockRedis from '../src';

describe('hsetnx', () => {
  const redis = new MockRedis({
    data: {
      emails: {
        'clark@daily.planet': '1',
      },
    },
  });
  it('should set a key in a hash map if it does not exist already', () =>
    redis.hsetnx('emails', 'bruce@wayne.enterprises', '2')
         .then(userNext => expect(userNext).toBeTruthy())
         .then(() => {
           expect(redis.data.emails['bruce@wayne.enterprises']).toBe('2', 'hash map value persisted');
           return redis.hsetnx('emails', 'clark@daily.planet', '2');
         })
         .then(userNext => expect(userNext).toBeFalsy('hsetnx no-op failed on existing key'))
  );
});

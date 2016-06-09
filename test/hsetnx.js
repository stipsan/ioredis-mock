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
  it('should set a key in a hashmap', () =>
    redis.hsetnx('emails', 'bruce@wayne.enterprises', '2')
         .then(userNext => expect(userNext).toBeTruthy())
  );
  it('should no-op if key already exists', () =>
    redis.hsetnx('emails', 'clark@daily.planet', '2')
         .then(userNext => expect(userNext).toBeFalsy())
  );
});

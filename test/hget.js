import expect from 'expect';

import MockRedis from '../src';

describe('hget', () => {
  it('should fetch a property in a hash', () => {
    const redis = new MockRedis({
      data: {
        emails: {
          'clark@daily.planet': '1',
        },
      },
    });

    return redis.hget('emails', 'clark@daily.planet').then(userId => expect(userId).toBe('1'));
  });
});

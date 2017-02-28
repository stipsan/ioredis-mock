import expect from 'expect';

import MockRedis from '../../src';

describe('hgetall', () => {
  it('should return all the keys and values in a hash map', () => {
    const emails = {
      'clark@daily.planet': '1',
      'bruce@wayne.enterprises': '2',
    };
    const redis = new MockRedis({
      data: {
        emails,
      },
    });

    return redis.hgetall('emails').then(result => expect(result).toEqual(emails));
  });
});

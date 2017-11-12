import expect from 'expect';

import MockRedis from '../../src';

describe('hvals', () => {
  it('should return an array over all the values in a hash map', () => {
    const redis = new MockRedis({
      data: {
        emails: {
          'clark@daily.planet': '1',
          'bruce@wayne.enterprises': '2'
        }
      }
    });

    return redis
      .hvals('emails')
      .then(result => expect(result).toEqual(['1', '2']));
  });

  it("should return empty array if sources don't exists", () => {
    const redis = new MockRedis();

    return redis.hvals('emails').then(result => expect(result).toEqual([]));
  });
});

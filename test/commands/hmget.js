import expect from 'expect';

import MockRedis from '../../src';

describe('hmget', () => {
  it('should return the values of specified keys in a hash map', () => {
    const redis = new MockRedis({
      data: {
        'user:1': { id: '1', email: 'bruce@wayne.enterprises' },
      },
    });
    return redis
      .hmget('user:1', 'id', 'email', 'location')
      .then(values =>
        expect(values).toEqual(['1', 'bruce@wayne.enterprises', null])
      );
  });

  it('should return an array of nulls if the hash does not exist', () => {
    const redis = new MockRedis();
    return redis
      .hmget('user:1', 'id', 'email', 'location')
      .then(values => expect(values).toEqual([null, null, null]));
  });
});

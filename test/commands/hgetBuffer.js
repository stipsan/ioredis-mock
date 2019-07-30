import expect from 'expect';

import MockRedis from '../../src';
import createBuffer from '../../src/buffer';

describe('hgetBuffer', () => {
  it('should fetch a property in a hash', () => {
    const redis = new MockRedis({
      data: {
        emails: {
          'clark@daily.planet': '1',
        },
      },
    });

    return redis.hgetBuffer('emails', 'clark@daily.planet').then(userId => {
      expect(Buffer.isBuffer(userId)).toBeTruthy();
      expect(userId).toEqual(createBuffer('1'));
    });
  });

  it('should return null if the hash does not exist', () => {
    const redis = new MockRedis();
    return redis
      .hgetBuffer('emails', 'clark@daily.planet')
      .then(userId => expect(userId).toBe(null));
  });

  it('should return null if the item does not exist in the hash', () => {
    const redis = new MockRedis({
      data: {
        emails: {
          'clark@daily.planet': '1',
        },
      },
    });

    return redis
      .hgetBuffer('emails', 'lois@daily.planet')
      .then(userId => expect(userId).toBe(null));
  });
});

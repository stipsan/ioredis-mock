import expect from 'expect';

import createBuffer from '../../src/buffer';
import MockRedis from '../../src';

describe('hmgetBuffer', () => {
  it('should return the values as buffers of specified keys in a hash map', () => {
    const redis = new MockRedis({
      data: {
        'user:1': { id: '1', email: 'bruce@wayne.enterprises' },
      },
    });
    return redis
      .hmgetBuffer('user:1', 'id', 'email', 'location')
      .then((values) => {
        expect(Buffer.isBuffer(values[0])).toBeTruthy();
        expect(Buffer.isBuffer(values[1])).toBeTruthy();
        expect(Buffer.isBuffer(values[2])).toBeFalsy();
        expect(values).toEqual([
          createBuffer('1'),
          createBuffer('bruce@wayne.enterprises'),
          null,
        ]);
      });
  });

  it('should return an array of nulls if the hash does not exist', () => {
    const redis = new MockRedis();
    return redis
      .hmgetBuffer('user:1', 'id', 'email', 'location')
      .then((values) => expect(values).toEqual([null, null, null]));
  });
});

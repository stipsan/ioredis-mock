import expect from 'expect';

import MockRedis from '../../src';

describe('hstrlen', () => {
  it('should return 0 on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis
      .hstrlen('nonexisting')
      .then((result) => expect(result).toBe(0));
  });

  it('should return 0 on fields that do not exist', () => {
    const redis = new MockRedis();

    return redis
      .hstrlen('nonexisting', 'foo')
      .then((result) => expect(result).toBe(0));
  });

  it('should return length on existing fields', () => {
    const redis = new MockRedis({
      data: {
        mykey: {
          foo: 'Hello world',
        },
      },
    });

    return redis
      .hstrlen('mykey', 'foo')
      .then((result) => expect(result).toBe(11));
  });
});

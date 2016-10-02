import expect from 'expect';

import MockRedis from '../../src';

describe('dbsize', () => {
  it('should return how many keys exists in db', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
        bar: 'foo',
      },
    });

    return redis.dbsize()
      .then(result => expect(result).toBe('2'));
  });
});

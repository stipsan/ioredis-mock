import expect from 'expect';

import createBuffer from '../../src/buffer';
import MockRedis from '../../src';

describe('mgetBuffer', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis.mget('foo').then(result => expect(result).toEqual([null]));
  });

  it('should return value keys that exist', () => {
    const redis = new MockRedis({
      data: {
        foo: createBuffer('test'),
      },
    });

    return redis
      .mget('foo', 'hello')
      .then(result => expect(result).toEqual([createBuffer('test'), null]);
  });
});

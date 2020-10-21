import MockRedis from '../../src';

describe('mget', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis.mget('foo').then((result) => expect(result).toEqual([null]));
  });

  it('should return value keys that exist', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });

    return redis
      .mget('foo', 'hello')
      .then((result) => expect(result).toEqual(['bar', null]));
  });
});

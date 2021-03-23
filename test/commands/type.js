import MockRedis from 'ioredis';

describe('type', () => {
  const redis = new MockRedis();

  it('should return none when key does not exist', () =>
    redis.type('nope').then((type) => expect(type).toBe('none')));

  it('should return string', () =>
    redis
      .set('mystring', 'foo')
      .then(() => redis.type('mystring'))
      .then((type) => expect(type).toBe('string')));

  it('should return list', () =>
    redis
      .lpush('mylist', 'foo')
      .then(() => redis.type('mylist'))
      .then((type) => expect(type).toBe('list')));

  it('should return set', () =>
    redis
      .sadd('myset', 'foo')
      .then(() => redis.type('myset'))
      .then((type) => expect(type).toBe('set')));

  it('should return hash', () =>
    redis
      .hset('myhash', 'foo', 'bar')
      .then(() => redis.type('myhash'))
      .then((type) => expect(type).toBe('hash')));

  it.skip('should return zset', () => {});
});

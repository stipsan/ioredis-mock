import Redis from 'ioredis';

describe('type', () => {
  const redis = new Redis();

  test('should return none when key does not exist', () =>
    redis.type('nope').then((type) => expect(type).toBe('none')));

  test('should return string', () =>
    redis
      .set('mystring', 'foo')
      .then(() => redis.type('mystring'))
      .then((type) => expect(type).toBe('string')));

  test('should return list', () =>
    redis
      .lpush('mylist', 'foo')
      .then(() => redis.type('mylist'))
      .then((type) => expect(type).toBe('list')));

  test('should return set', () =>
    redis
      .sadd('myset', 'foo')
      .then(() => redis.type('myset'))
      .then((type) => expect(type).toBe('set')));

  test('should return hash', () =>
    redis
      .hset('myhash', 'foo', 'bar')
      .then(() => redis.type('myhash'))
      .then((type) => expect(type).toBe('hash')));

  test.todo('should return zset');
});

import { ObjectWritableMock } from 'stream-mock';
import Chance from 'chance';
import flatten from 'lodash.flatten';
import Redis from 'ioredis';

describe('keyprefix', () => {
  let writable;

  beforeEach(() => {
    writable = new ObjectWritableMock({ objectMode: true });
  });

  describe('get', () => {
    it('should return null on keys that do not exist', () => {
      const redis = new Redis({ keyPrefix: 'test:' });
      return redis.get('bar').then((result) => expect(result).toBe(null));
    });

    it('should return value of key', () => {
      const redis = new Redis({
        data: {
          foo: 'bar',
        },
        keyPrefix: 'test:',
      });

      return redis.get('foo').then((result) => expect(result).toBe('bar'));
    });
  });

  describe('set', () => {
    it('should return OK when setting a hash key', () => {
      const redis = new Redis({ keyPrefix: 'test:' });
      return redis
        .set('foo', 'bar')
        .then((status) => expect(status).toBe('OK'))
        .then(() => expect(redis.data.get('foo')).toBe('bar'));
    });

    it('should turn number to string', () => {
      const redis = new Redis({ keyPrefix: 'test:' });
      return redis
        .set('foo', 1.5)
        .then((status) => expect(status).toBe('OK'))
        .then(() => expect(redis.data.get('foo')).toBe('1.5'));
    });
  });

  describe('del', () => {
    const redis = new Redis({
      data: {
        deleteme: 'please',
        metoo: 'pretty please',
      },
      keyPrefix: 'test:',
    });

    it('should delete passed in keys', () =>
      redis
        .del('deleteme', 'metoo')
        .then((status) => expect(status).toBe(2))
        .then(() => expect(redis.data.has('deleteme')).toBe(false))
        .then(() => expect(redis.data.has('metoo')).toBe(false)));

    it('return the number of keys removed', () =>
      redis.del('deleteme', 'metoo').then((status) => expect(status).toBe(0)));
  });

  describe('scanSream', () => {
    it('should batch by count', (done) => {
      // Given
      const chance = new Chance();
      const keys = chance.unique(chance.word, 100);
      const count = 11;
      const redis = new Redis({
        data: { set: new Set(keys) },
        keyPrefix: 'test:',
      });
      const stream = redis.sscanStream('set', { count });
      // When
      stream.pipe(writable);
      writable.on('finish', () => {
        // Then
        expect(writable.data.length).toEqual(Math.ceil(keys.length / count));
        expect(flatten(writable.data)).toEqual(keys);
        done();
      });
    });

    it('should return  keys', (done) => {
      // Given
      const redis = new Redis({
        data: {
          foo: new Set(['foo0', 'foo1', 'foo2']),
          zu: new Set(['ZU0', 'ZU1']),
        },
        keyPrefix: 'test:',
      });

      const stream = redis.scanStream();
      // When
      stream.pipe(writable);
      writable.on('finish', () => {
        // Then
        expect(flatten(writable.data)).toEqual(['test:foo', 'test:zu']);
        done();
      });
    });

    it('should return only mathced keys', (done) => {
      // Given
      const redis = new Redis({
        data: {
          set: new Set(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
        },
        keyPrefix: 'test:',
      });

      const stream = redis.sscanStream('set', { match: 'foo*' });
      // When
      stream.pipe(writable);
      writable.on('finish', () => {
        // Then
        expect(flatten(writable.data)).toEqual(['foo0', 'foo1', 'foo2']);
        done();
      });
    });
  });

  describe('multiple instance use same key with different keyPrefix', () => {
    const redisBase = new Redis({
      data: {
        'test:foo': 'bar',
        'test:hello': 'world',
      },
    });
    const redis1 = redisBase.createConnectedClient({
      keyPrefix: 'test:',
    });

    const redis2 = redis1.createConnectedClient({
      keyPrefix: 'test2:',
    });

    it('should return value of key using prefix', () =>
      redis1.get('foo').then((result) => expect(result).toEqual('bar')));

    it('should return null on keys that do not exist for that prefix', () =>
      redis2.get('foo').then((result) => expect(result).toBe(null)));

    it('setting with one prefix should not affect same key with another prefix', () =>
      redis2
        .set('hello', 'ioredis')
        .then((status) => expect(status).toBe('OK'))
        .then(() => redis1.get('hello'))
        .then((result) => expect(result).toBe('world')));

    it('should return value of key if the prefix is the same', () =>
      redis2
        .set('hello', 'ioredis')
        .then((status) => expect(status).toBe('OK'))
        .then(() => expect(redis2.data.get('hello')).toBe('ioredis')));
  });
});

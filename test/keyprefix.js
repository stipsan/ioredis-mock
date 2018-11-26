import expect from 'expect';
import Set from 'es6-set';
import { WritableMock } from 'stream-mock';
import Chance from 'chance';
import MockRedis from '../src';

describe('keyprefix', () => {
  let writable;

  beforeEach(() => {
    writable = new WritableMock({ objectMode: true });
  });

  describe('get', () => {
    it('should return null on keys that do not exist', () => {
      const redis = new MockRedis({ keyPrefix: 'test:' });
      return redis.get('foo').then(result => expect(result).toBe(null));
    });

    it('should return null on keys that do not exist', () => {
      const redis = new MockRedis({ keyPrefix: 'test:' });
      return redis.get('foo').then(result => expect(result).toBe(null));
    });

    it('should return value of key', () => {
      const redis = new MockRedis({
        data: {
          foo: 'bar',
        },
        keyPrefix: 'test:',
      });

      return redis.get('foo').then(result => expect(result).toBe('bar'));
    });
  });

  describe('set', () => {
    it('should return OK when setting a hash key', () => {
      const redis = new MockRedis({ keyPrefix: 'test:' });
      return redis
        .set('foo', 'bar')
        .then(status => expect(status).toBe('OK'))
        .then(() => expect(redis.data.get('foo')).toBe('bar'));
    });

    it('should turn number to string', () => {
      const redis = new MockRedis({ keyPrefix: 'test:' });
      return redis
        .set('foo', 1.5)
        .then(status => expect(status).toBe('OK'))
        .then(() => expect(redis.data.get('foo')).toBe('1.5'));
    });
  });

  describe('del', () => {
    const redis = new MockRedis({
      data: {
        deleteme: 'please',
        metoo: 'pretty please',
      },
      keyPrefix: 'test:',
    });

    it('should delete passed in keys', () =>
      redis
        .del('deleteme', 'metoo')
        .then(status => expect(status).toBe(2))
        .then(() => expect(redis.data.has('deleteme')).toBe(false))
        .then(() => expect(redis.data.has('metoo')).toBe(false)));

    it('return the number of keys removed', () =>
      redis.del('deleteme', 'metoo').then(status => expect(status).toBe(0)));
  });

  describe('scanSream', () => {
    it('should batch by count', done => {
      // Given
      const chance = new Chance();
      const keys = chance.unique(chance.word, 100);
      const count = 11;
      const redis = new MockRedis({
        data: { set: new Set(keys) },
        keyPrefix: 'test:',
      });
      const stream = redis.sscanStream('set', { count });
      // When
      stream.pipe(writable);
      writable.on('finish', () => {
        // Then
        expect(writable.data.length).toEqual(Math.ceil(keys.length / count));
        expect(writable.flatData).toEqual(keys);
        done();
      });
    });

    it('should return  keys', done => {
      // Given
      const redis = new MockRedis({
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
        expect(writable.flatData).toEqual(['test:foo', 'test:zu']);
        done();
      });
    });

    it('should return only mathced keys', done => {
      // Given
      const redis = new MockRedis({
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
        expect(writable.flatData).toEqual(['foo0', 'foo1', 'foo2']);
        done();
      });
    });
  });

  describe('multiple intance use same key with diffence keyPrefix', () => {
    const redis1 = new MockRedis({
      data: {
        foo: 'bar',
        hello: 'world',
      },
      keyPrefix: 'test:',
    });

    const redis2 = new MockRedis({
      keyPrefix: 'test2:',
    });

    it('should return value of key', () =>
      redis1.get('foo').then(result => expect(result).toEqual('bar')));

    it('should return null on keys that do not exist', () =>
      redis2.get('foo').then(result => expect(result).toBe(null)));

    it('should return value of key', () =>
      redis2
        .set('hello', 'ioredis')
        .then(status => expect(status).toBe('OK'))
        .then(() => expect(redis2.data.get('hello')).toBe('ioredis')));
  });
});

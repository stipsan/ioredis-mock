import expect from 'expect';
import Map from 'es6-map';
import { WritableMock } from 'stream-mock';
import Chance from 'chance';
import MockRedis from '../../src';

const chance = new Chance();

describe('zscanStream', () => {
  let writable;
  function createMap(keys) {
    return new Map(keys.map(k => [k, { score: 0, value: k }]));
  }

  beforeEach(() => {
    writable = new WritableMock({ objectMode: true });
  });

  it('should return null array if nothing in db', done => {
    // Given
    const redis = new MockRedis();
    const stream = redis.zscanStream('key');
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.data).toEqual([]);
      done();
    });
  });

  it('should return keys in db', done => {
    const redis = new MockRedis({
      data: {
        zset: createMap(['foo', 'bar']),
      },
    });
    const stream = redis.zscanStream('zset');
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.flatData).toEqual(['foo', 'bar']);
      done();
    });
  });

  it('should batch by count', done => {
    // Given
    const keys = chance.unique(chance.word, 100);
    const count = 11;
    const redis = new MockRedis({ data: { zset: createMap(keys) } });
    const stream = redis.zscanStream('zset', { count });
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.data.length).toEqual(Math.ceil(keys.length / count));
      expect(writable.flatData).toEqual(keys);
      done();
    });
  });

  it('should return only mathced keys', done => {
    // Given
    const redis = new MockRedis({
      data: {
        zset: createMap(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    });
    const stream = redis.zscanStream('zset', { match: 'foo*' });
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.flatData).toEqual(['foo0', 'foo1', 'foo2']);
      done();
    });
  });

  it('should return only mathced keys by count', done => {
    // Given
    const redis = new MockRedis({
      data: {
        zset: createMap(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    });
    const stream = redis.zscanStream('zset', { match: 'foo*', count: 1 });
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.data.length).toEqual(Math.ceil(3));
      expect(writable.flatData).toEqual(['foo0', 'foo1', 'foo2']);
      done();
    });
  });

  it('should fail if incorrect count usage', done => {
    // Given
    const redis = new MockRedis({
      data: {
        zset: createMap(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    });
    const stream = redis.zscanStream('zset', { count: 'ZU' });
    // When
    stream.pipe(writable);
    stream.on('error', err => {
      // Then
      expect(err).toBeA(Error);
      done();
    });
    writable.on('finish', () => done(new Error('should not finish')));
  });
});

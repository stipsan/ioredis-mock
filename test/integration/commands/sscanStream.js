import Chance from 'chance';
import Redis from 'ioredis';
import flatten from 'lodash.flatten';
import { ObjectWritableMock } from 'stream-mock';

const chance = new Chance();

describe('sscanStream', () => {
  let writable;

  beforeEach(() => {
    writable = new ObjectWritableMock();
  });

  it('should return null array if nothing in db', (done) => {
    // Given
    const redis = new Redis();
    const stream = redis.sscanStream('key');
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.data).toEqual([]);
      done();
    });
  });

  it('should return keys in db', (done) => {
    const redis = new Redis({
      data: {
        set: new Set(['foo', 'bar']),
      },
    });
    const stream = redis.sscanStream('set');
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(flatten(writable.data)).toEqual(['foo', 'bar']);
      done();
    });
  });

  it('should batch by count', (done) => {
    // Given
    const keys = chance.unique(chance.word, 100);
    const count = 11;
    const redis = new Redis({ data: { set: new Set(keys) } });
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

  it('should return only mathced keys', (done) => {
    // Given
    const redis = new Redis({
      data: {
        set: new Set(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
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

  it('should return only mathced keys by count', (done) => {
    // Given
    const redis = new Redis({
      data: {
        set: new Set(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    });
    const stream = redis.sscanStream('set', { match: 'foo*', count: 1 });
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.data.length).toEqual(Math.ceil(3));
      expect(flatten(writable.data)).toEqual(['foo0', 'foo1', 'foo2']);
      done();
    });
  });

  it('should fail if incorrect count usage', (done) => {
    // Given
    const redis = new Redis({
      data: {
        set: new Set(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    });
    const stream = redis.sscanStream('set', { count: 'ZU' });
    // When
    stream.pipe(writable);
    stream.on('error', (err) => {
      // Then
      expect(err).toBeInstanceOf(Error);
      done();
    });
    writable.on('finish', () => done(new Error('should not finish')));
  });
});

import Chance from 'chance';
import Redis from 'ioredis';
import zipObject from 'lodash.zipobject';
import { ObjectWritableMock } from 'stream-mock';

const chance = new Chance();

describe('scanStream', () => {
  let writable;

  beforeEach(() => {
    writable = new ObjectWritableMock();
  });

  it('should return null array if nothing in db', (done) => {
    // Given
    const redis = new Redis();
    const stream = redis.scanStream();
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
        foo: 'bar',
        test: 'bar',
      },
    });
    const stream = redis.scanStream();
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect([].concat(...writable.data)).toEqual(['foo', 'test']);
      done();
    });
  });

  it('should batch by count', (done) => {
    // Given
    const keys = chance.unique(chance.word, 100);
    const count = 11;
    const data = zipObject(keys, Array(keys).fill('bar'));
    const redis = new Redis({ data });
    const stream = redis.scanStream({ count });
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.data.length).toEqual(Math.ceil(keys.length / count));
      expect([].concat(...writable.data)).toEqual(keys);
      done();
    });
  });

  it('should return only mathced keys', (done) => {
    // Given
    const redis = new Redis({
      data: {
        foo0: 'x',
        foo1: 'x',
        foo2: 'x',
        test0: 'x',
        test1: 'x',
      },
    });
    const stream = redis.scanStream({ match: 'foo*' });
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect([].concat(...writable.data)).toEqual(['foo0', 'foo1', 'foo2']);
      done();
    });
  });
});

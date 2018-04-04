import expect from 'expect';
import { WritableMock } from 'stream-mock';
import Chance from 'chance';
import MockRedis from '../../src';

const chance = new Chance();

describe('scanStream', () => {
  let writable;

  beforeEach(() => {
    writable = new WritableMock({ objectMode: true });
  });

  it('should return null array if nothing in db', done => {
    // Given
    const redis = new MockRedis();
    const stream = redis.scanStream();
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.data[0]).toEqual([]);
      done();
    });
  });

  it('should return keys in db', done => {
    const redis = new MockRedis({
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
      expect(writable.data[0]).toEqual(['foo', 'test']);
      done();
    });
  });

  it('should batch by count', done => {
    // Given
    const keys = chance.unique(chance.word, 100);
    const count = 11;
    const data = keys.reduce((acc, curr) => {
      acc[curr] = 'bar';
      return acc;
    }, {});
    const redis = new MockRedis({ data });
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

  it('should return only mathced keys', done => {
    // Given
    const redis = new MockRedis({
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
      expect(writable.data[0]).toEqual(['foo0', 'foo1', 'foo2']);
      done();
    });
  });
});

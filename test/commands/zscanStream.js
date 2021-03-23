import Map from 'es6-map';
import { ObjectWritableMock } from 'stream-mock';
import Chance from 'chance';
import _ from 'lodash';
import MockRedis from '../../src';

const chance = new Chance();

describe('zscanStream', () => {
  let writable;
  const flatten = (wrt) => _.flatten(wrt.data);
  const createMap = (keys) =>
    new Map(keys.map((k) => [k, { score: 0, value: k }]));

  beforeEach(() => {
    writable = new ObjectWritableMock();
  });

  it('should return null array if nothing in db', (done) => {
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

  it('should return keys in db', (done) => {
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
      expect(flatten(writable)).toEqual(['foo', '0', 'bar', '0']);
      done();
    });
  });

  it('should batch by count', (done) => {
    // Given
    const keys = chance.unique(chance.word, 100);
    const keysWithScore = keys.reduce((a, c) => {
      a.push(c, '0');
      return a;
    }, []);
    const count = 11;
    const redis = new MockRedis({ data: { zset: createMap(keys) } });
    const stream = redis.zscanStream('zset', { count });
    // When
    stream.pipe(writable);
    writable.on('finish', () => {
      // Then
      expect(writable.data.length).toEqual(Math.ceil(keys.length / count));
      expect(flatten(writable)).toEqual(keysWithScore);
      done();
    });
  });

  it('should return only matched keys', (done) => {
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
      expect(flatten(writable)).toEqual([
        'foo0',
        '0',
        'foo1',
        '0',
        'foo2',
        '0',
      ]);
      done();
    });
  });

  it('should return only matched keys by count', (done) => {
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
      expect(flatten(writable)).toEqual([
        'foo0',
        '0',
        'foo1',
        '0',
        'foo2',
        '0',
      ]);
      done();
    });
  });

  it('should fail if incorrect count usage', (done) => {
    // Given
    const redis = new MockRedis({
      data: {
        zset: createMap(['foo0', 'ZU0', 'foo1', 'foo2', 'ZU1']),
      },
    });
    const stream = redis.zscanStream('zset', { count: 'ZU' });
    // When
    stream.pipe(writable);
    stream.on('error', (err) => {
      // Then
      expect(err).toBeInstanceOf(Error);
      done();
    });
    writable.on('finish', () => done(new Error('should not finish')));
  });

  it('zscanStream behavior should match ioredis', (done) => {
    const redis = new MockRedis();
    redis.zadd('test', 1, 'a', 2, 'b', 3, 'c').then(() => {
      const stream = redis.zscanStream('test');
      stream.on('data', (replies) => {
        expect(replies).toEqual(['a', '1', 'b', '2', 'c', '3']);
        done();
      });
    });
  });
});

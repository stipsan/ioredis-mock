import semver from 'semver';
import expect from 'expect';

import MockRedis from '../../src';

const shouldSkip = semver.lt(process.versions.node, '0.11.0');

describe('getBuffer', () => {
  it('should return null on keys that do not exist', () => {
    const redis = new MockRedis();

    return redis.getBuffer('foo').then(result => expect(result).toBe(null));
  });

  it('should return value of key', () => {
    const redis = new MockRedis({
      data: {
        foo: 'bar',
      },
    });

    return redis.getBuffer('foo').then(result => expect(result).toBe('bar'));
  });

  it('should return buffer values correctly', function() {
    if (shouldSkip) {
      this.skip();
    }

    const bufferVal = new Buffer('bar');
    const redis = new MockRedis({
      data: {
        foo: bufferVal,
      },
    });

    return redis
      .getBuffer('foo')
      .then(result => expect(result.equals(bufferVal)).toBe(true));
  });
});

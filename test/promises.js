import bluebird from 'bluebird';

import MockRedis from '../src';

const nativePromise = global.Promise;

describe('promise libraries', () => {
  it('should use the native Promise by default', () => {
    const redis = new MockRedis();

    expect(redis.get('itgirl').constructor).toEqual(nativePromise);
  });

  it('should allow setting a different promise library', () => {
    const redis = new MockRedis();
    MockRedis.Promise = bluebird;

    expect(redis.get('wellsoon').constructor).toEqual(bluebird);
  });
});

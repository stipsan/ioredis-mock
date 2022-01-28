import bluebird from 'bluebird';
import Redis from 'ioredis';

const nativePromise = global.Promise;

describe('promise libraries', () => {
  it('should use the native Promise by default', () => {
    const redis = new Redis();

    expect(redis.get('itgirl').constructor).toEqual(nativePromise);
  });

  it('should allow setting a different promise library', () => {
    const redis = new Redis();
    Redis.Promise = bluebird;

    expect(redis.get('wellsoon').constructor).toEqual(bluebird);
  });
});

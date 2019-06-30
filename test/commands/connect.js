import expect from 'expect';

import MockRedis from '../../src';

describe('connect', () => {
  it('should throw if redis has already connected in ctor', done => {
    // no option specified means {lazyConnect: false}
    const redis = new MockRedis();

    setTimeout(() => {
      redis
        .connect()
        .then(() => {
          throw new Error('connect should not have succeeded');
        })
        .catch(reason => {
          expect(reason.message).toBe('Redis is already connecting/connected');
          done();
        });
    }, 20);
  });

  it('should signal successful connection', done => {
    const redis = new MockRedis({ lazyConnect: true });

    setTimeout(() => {
      redis
        .connect()
        .catch(reason => expect(reason).toNotExist())
        .then(result => {
          expect(result).toBe(undefined);
          done();
        });
    }, 20);
  });

  it('should throw if manually connected before', () => {
    const redis = new MockRedis({ lazyConnect: true });

    return redis
      .connect()
      .then(result => expect(result).toBe(undefined))
      .then(
        () =>
          new Promise(resolve => {
            redis
              .connect()
              .catch(reason => expect(reason).toBeA(Error))
              .then(() => resolve());
          })
      );
  });

  it('should throw if executing any command when not connected', () => {
    const redis = new MockRedis({ lazyConnect: true });

    return redis
      .get('key')
      .then(() => {
        throw new Error('get shall not succeed when redis is not connected');
      })
      .catch(reason =>
        expect(reason.message).toBe(
          "Stream isn't writeable and enableOfflineQueue options is false"
        )
      );
  });
});

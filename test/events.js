import MockRedis from '../src';

describe('events', () => {
  it('should trigger ready and connect events on instantiation', (done) => {
    const redis = new MockRedis({});
    const readySpy = jest.fn();
    const connectSpy = jest.fn();
    redis.on('ready', readySpy);
    redis.on('connect', connectSpy);

    setImmediate(() => {
      expect(connectSpy).toHaveBeenCalled();
      expect(readySpy).toHaveBeenCalled();
      done();
    });
  });
});

import Redis from 'ioredis';

describe('events', () => {
  it('should trigger ready and connect events on instantiation', (done) => {
    const redis = new Redis({});
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

import expect, { createSpy } from 'expect';

import MockRedis from '../src';

describe('events', () => {
  it('should trigger ready and connect events on instantiation', (done) => {
    const redis = new MockRedis({});
    const readySpy = createSpy();
    const connectSpy = createSpy();
    redis.on('ready', readySpy);
    redis.on('connect', connectSpy);

    setImmediate(() => {
      expect(connectSpy).toHaveBeenCalled('connect event not emitted');
      expect(readySpy).toHaveBeenCalled('ready event not emitted');
      done();
    });
  });
});

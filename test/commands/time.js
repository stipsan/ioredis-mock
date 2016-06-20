import expect from 'expect';

import MockRedis from '../../src';

describe('time', () => {
  it('should return an array with current time in seconds and microseconds', () => {
    const redis = new MockRedis();
    const time = microtime.nowStruct();

    return redis.time().then(result => {
      expect(result[0]).toBeGreaterThanOrEqualTo(time[0]);
      expect(result[0]).toBeLessThan(time[0] + 10);
      expect(result[1]).toBeA('number');
    });
  });
});

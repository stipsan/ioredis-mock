import MockRedis from '../../src';

describe('time', () => {
  it('should return an array with current time in seconds and microseconds', () => {
    const redis = new MockRedis();
    const time = Math.round(new Date().getTime() / 1000);

    return redis.time().then((result) => {
      expect(result[0]).toBeGreaterThanOrEqual(time);
      expect(result[0]).toBeLessThan(time + 10);
      expect(result[1]).toEqual(expect.any(Number));
    });
  });
});

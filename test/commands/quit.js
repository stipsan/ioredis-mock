import MockRedis from '../../src';

describe('quit', () => {
  const redis = new MockRedis();
  it('should return OK', () =>
    redis.quit().then((res) => expect(res).toBe('OK')));
});

import MockRedis from '../../src';

describe('save', () => {
  it('should return OK', () => {
    const redis = new MockRedis();

    return redis.save().then((status) => expect(status).toBe('OK'));
  });
});

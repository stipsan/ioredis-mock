import MockRedis from '../../src';

describe('echo', () => {
  it('should return message', () => {
    const redis = new MockRedis();

    return redis
      .echo('Hello World!')
      .then((result) => expect(result).toBe('Hello World!'));
  });
});

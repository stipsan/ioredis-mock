import Redis from 'ioredis';

describe('role', () => {
  test('should return role info on the current redis instance', () => {
    const redis = new Redis();

    return redis.role().then((result) => expect(result).toEqual(['master', 0]));
  });

  test.todo('should return slave info');
});

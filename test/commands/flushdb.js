import Redis from 'ioredis';

describe('flushdb', () => {
  const redis = new Redis({
    data: {
      deleteme: 'please',
      metoo: 'pretty please',
    },
  });
  test('should empty current db', () =>
    redis
      .flushdb()
      .then((status) => expect(status).toBe('OK'))
      .then(() => expect(redis.data.keys().length).toBe(0)));
  test.todo('should empty other db after SELECT');
});

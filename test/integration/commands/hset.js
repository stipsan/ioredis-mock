import Redis from 'ioredis';

describe('hset', () => {
  const redis = new Redis();

  it('should return 1 when setting a new field', () =>
    redis
      .hset('user:1', 'email', 'clark@daily.planet')
      .then((status) => expect(status).toBe(1))
      .then(() =>
        expect(redis.data.get('user:1')).toEqual({
          email: 'clark@daily.planet',
        })
      ));

      it('should return 2 when setting a 2 fields', () =>
    redis
      .hset('user:1', 'email', 'bruce@wayne.enterprises', 'age', '24')
      .then((status) => expect(status).toBe(2))
      .then(() =>
        expect(redis.data.get('user:1')).toEqual({
          email: 'bruce@wayne.enterprises',
          age: '24',
        })
      ));

  it('should return 0 when overwriting existing field', async () =>
    {
      await redis
      .hset('user:1', 'email', 'clark@daily.planet');return redis
      .hset('user:1', 'email', 'bruce@wayne.enterprises')
      .then((status) => expect(status).toBe(0))
      .then(() =>
        expect(redis.data.get('user:1')).toEqual({
          email: 'bruce@wayne.enterprises',
        })
      )});

  it('should allow setting multiple fields', async () =>
    {
      await redis
      .hset('user:1', 'email', 'clark@daily.planet');
      return redis
      .hset('user:1', 'email', 'bruce@wayne.enterprises', 'age', '24')
      .then((status) => expect(status).toBe(1))
      .then(() =>
        expect(redis.data.get('user:1')).toEqual({
          email: 'bruce@wayne.enterprises',
          age: '24',
        })
      )});
      
});

import Redis from 'ioredis';

describe('hsetnx', () => {
  it('should set a key in a hash map if it does not exist already', () => {
    const redis = new Redis();
    return redis
      .hsetnx('emails', 'bruce@wayne.enterprises', '1')
      .then((status) => expect(status).toBe(1))
      .then(() => {
        expect(redis.data.get('emails')['bruce@wayne.enterprises']).toBe('1');
        return redis.hsetnx('emails', 'bruce@wayne.enterprises', '2');
      })
      .then((status) => expect(status).toBe(0))
      .then(() => {
        expect(redis.data.get('emails')['bruce@wayne.enterprises']).toBe('1');
      });
  });
});

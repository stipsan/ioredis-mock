import Redis from 'ioredis';

describe('hgetall', () => {
  it('should return all the keys and values in a hash map', () => {
    const emails = {
      'clark@daily.planet': '1',
      'bruce@wayne.enterprises': '2',
    };
    const redis = new Redis({
      data: {
        emails,
      },
    });

    return redis
      .hgetall('emails')
      .then((result) => expect(result).toEqual(emails));
  });

  it('should return an empty object if the hash does not exist', () => {
    const redis = new Redis();
    return redis.hgetall('emails').then((result) => expect(result).toEqual({}));
  });
});

import Redis from 'ioredis';

describe('hget', () => {
  it('should fetch a property in a hash', () => {
    const redis = new Redis({
      data: {
        emails: {
          'clark@daily.planet': '1',
        },
      },
    });

    return redis
      .hget('emails', 'clark@daily.planet')
      .then((userId) => expect(userId).toBe('1'));
  });

  it('should return null if the hash does not exist', () => {
    const redis = new Redis();
    return redis
      .hget('emails', 'clark@daily.planet')
      .then((userId) => expect(userId).toBe(null));
  });

  it('should return null if the item does not exist in the hash', () => {
    const redis = new Redis({
      data: {
        emails: {
          'clark@daily.planet': '1',
        },
      },
    });

    return redis
      .hget('emails', 'lois@daily.planet')
      .then((userId) => expect(userId).toBe(null));
  });
});

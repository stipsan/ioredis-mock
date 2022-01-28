import Redis from 'ioredis';

describe('hincrbyfloat', () => {
  it('should increment an float with passed increment', () => {
    const redis = new Redis({
      data: {
        mykey: { field: '10.50' },
      },
    });

    return redis
      .hincrbyfloat('mykey', 'field', 0.1)
      .then((result) => expect(result).toBe('10.6'))
      .then(() => redis.hincrbyfloat('mykey', 'field', -5))
      .then((result) => expect(result).toBe('5.6'))
      .then(() => expect(redis.data.get('mykey').field).toBe('5.6'));
  });

  it('should support exponents', () => {
    const redis = new Redis({
      data: {
        mykey: { field: '5.0e3' },
      },
    });

    return redis
      .hincrbyfloat('mykey', 'field', '2.0e2')
      .then((result) => expect(result).toBe('5200'))
      .then(() => expect(redis.data.get('mykey').field).toBe('5200'));
  });

  it('should create hash if not exists', () => {
    const redis = new Redis();

    return redis
      .hincrbyfloat('stats', 'health', 0.5)
      .then((result) => expect(result).toBe('0.5'))
      .then(() => expect(redis.data.get('stats').health).toBe('0.5'));
  });

  it('should create field in hash if not exists', () => {
    const redis = new Redis({
      data: {
        stats: {},
      },
    });

    return redis
      .hincrbyfloat('stats', 'health', 0.5)
      .then((result) => expect(result).toBe('0.5'))
      .then(() => expect(redis.data.get('stats').health).toBe('0.5'));
  });
});

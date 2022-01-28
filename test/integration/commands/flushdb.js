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
  test('should stay in sync cross instances', async () => {
    const redis1 = new Redis();
    const redis2 = new Redis();

    await redis1.set('foo', 'bar');
    expect(await redis1.get('foo')).toBe('bar');
    expect(await redis2.get('foo')).toBe('bar');

    await redis1.flushdb();
    expect(await redis1.get('foo')).toBe(null);
    expect(await redis2.get('foo')).toBe(null);

    await redis1.set('foo', 'bloop');
    expect(await redis1.get('foo')).toBe('bloop');
    expect(await redis2.get('foo')).toBe('bloop');
  });
});

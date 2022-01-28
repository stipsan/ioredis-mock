import Redis from 'ioredis';

describe('zadd', () => {
  const redis = new Redis();

  afterAll(() => {return redis.disconnect()});

  it('should add 1 item to sorted set', async () => {
    const status = await redis.zadd('foos', '1', 'foo');
    expect(status).toBe(1);

    expect(await redis.zrange('foos', 0, -1)).toEqual(['foo']);
  });
  it('should add 2 items to sorted set', async () => {
    const status = await redis.zadd('foos', '1', 'foo', '2', 'baz');
    expect(status).toBe(2);

    expect(await redis.zrange('foos', 0, -1)).toEqual(['foo', 'baz']);
  });
  it('should not increase length when adding duplicates', () =>
    {return  redis
      .zadd('key', 'value', 'value')
      .then((status) => {return expect(status).toBe(1)})
      .then(() => {return expect(redis.data.get('key').has('value')).toBe(true)})});
  it('should not allow nx and xx options in the same call', () =>
    {return redis
      .zadd('key', ['NX', 'XX'], 1, 'value')
      .catch((e) =>
        {return expect(e.message).toEqual(
          'XX and NX options at the same time are not compatible'
        )}
      )});
  it('should not update a value that exists with NX option', () => {
    redis.zadd('key', 'NX', 1, 'value').then(() => {
      redis.zadd('key', 'NX', 2, 'value').then((r) => {return expect(r).toBe(0)});
    });
  });
  it('should return updated + added with CH option', () => {
    redis.zadd('key', 1, 'value').then(() => {
      redis
        .zadd('key', 'CH', 3, 'value', 2, 'value2')
        .then((r) => {return expect(r).toBe(2)});
    });
  });
  it('should only update elements that already exist with XX option', () => {
    redis.zadd('key', 1, 'value').then(() => {
      redis
        .zadd('key', ['XX', 'CH'], 2, 'value')
        .then((r) => {return expect(r).toBe(1)});
    });
  });
  it('should handle INCR option', () => {
    redis.zadd('key', 1, 'value').then(() => {
      redis
        .zadd('key', 'INCR', 2, 'value')
        .then(() =>
          {return expect(redis.data.get('key').get('value').score).toEqual(3)}
        );
    });
  });
});

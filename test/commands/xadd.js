import MockRedis from '../../src';

describe('xadd', () => {
  it('should add events to a stream', () => {
    const redis = new MockRedis();
    return redis
      .xadd('stream', '*', 'key', 'val')
      .then((id) => {
        expect(id).toBe('1-0');
        expect(redis.data.get('stream')).toEqual([['1-0', ['key', 'val']]]);
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        });
      })
      .then(() => redis.xadd('stream', '*', 'key', 'val'))
      .then((id) => {
        expect(id).toBe('2-0');
        expect(redis.data.get('stream')).toEqual([
          ['1-0', ['key', 'val']],
          ['2-0', ['key', 'val']],
        ]);
        expect(redis.data.get(`stream:stream:${id}`)).toEqual({
          polled: false,
        });
      });
  });

  it('should throw with an illegal amount of arguments', () => {
    const redis = new MockRedis();
    return Promise.all([
      redis.xadd().catch((err) => err.message),
      redis.xadd('stream').catch((err) => err.message),
      redis.xadd('stream', '*').catch((err) => err.message),
      redis.xadd('stream', '*', 'one').catch((err) => err.message),
    ]).then((errors) =>
      errors.forEach((err) =>
        expect(err).toBe("ERR wrong number of arguments for 'xadd' command")
      )
    );
  });

  it('should throw with a duplicate id', () => {
    const redis = new MockRedis();
    redis
      .xadd('stream', '*', 'key', 'value')
      .then((id) => redis.xadd('stream', id, 'key', 'value'))
      .catch((err) =>
        expect(err.message).toBe(
          'ERR The ID specified in XADD is equal or smaller than the target stream top item'
        )
      );
  });
});

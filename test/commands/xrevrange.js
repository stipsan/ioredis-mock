import expect from 'expect';

import MockRedis from '../../src';

describe('xrevrange', () => {
  it('returns an empty list on a non existing stream', () => {
    const redis = new MockRedis();
    return redis
      .xrevrange('non-existing', '-', '+')
      .then((events) => expect(events).toEqual([]));
  });

  it('returns the contents of the stream', () => {
    const redis = new MockRedis({
      data: {
        stream: [
          ['1-0', ['key', 'val']],
          ['2-0', ['key', 'val']],
          ['3-0', ['key', 'val']],
          ['4-0', ['key', 'val']],
        ],
        'stream:stream:1-0': { polled: false },
        'stream:stream:2-0': { polled: false },
        'stream:stream:3-0': { polled: false },
        'stream:stream:4-0': { polled: false },
      },
    });
    return Promise.all([
      redis.xrevrange('stream', '+', '-'),
      redis.xrevrange('stream', '2', '-'),
      redis.xrevrange('stream', '+', '2'),
      redis.xrevrange('stream', '3', '2'),
      redis.xrevrange('stream', '2', '2'),
    ]).then(([events1, events2, events3, events4, events5]) => {
      expect(events1).toEqual([
        ['4-0', ['key', 'val']],
        ['3-0', ['key', 'val']],
        ['2-0', ['key', 'val']],
        ['1-0', ['key', 'val']],
      ]);
      expect(events2).toEqual([
        ['2-0', ['key', 'val']],
        ['1-0', ['key', 'val']],
      ]);
      expect(events3).toEqual([
        ['4-0', ['key', 'val']],
        ['3-0', ['key', 'val']],
        ['2-0', ['key', 'val']],
      ]);
      expect(events4).toEqual([
        ['3-0', ['key', 'val']],
        ['2-0', ['key', 'val']],
      ]);
      expect(events5).toEqual([['2-0', ['key', 'val']]]);
    });
  });

  it('should limit the count of events', () => {
    const redis = new MockRedis({
      data: {
        stream: [
          ['1-0', ['key', 'val']],
          ['2-0', ['key', 'val']],
          ['3-0', ['key', 'val']],
        ],
        'stream:stream:1-0': { polled: false },
        'stream:stream:2-0': { polled: false },
        'stream:stream:3-0': { polled: false },
      },
    });
    return redis.xrevrange('stream', '+', '-', 'COUNT', '2').then((events) => {
      expect(events).toEqual([
        ['3-0', ['key', 'val']],
        ['2-0', ['key', 'val']],
      ]);
    });
  });

  it('should throw with a wrong number of arguments', () => {
    const redis = new MockRedis();
    return Promise.all([
      redis.xrevrange('stream', '+').catch((err) => err.message),
      redis.xrevrange('stream').catch((err) => err.message),
      redis.xrevrange().catch((err) => err.message),
    ]).then((errors) =>
      errors.forEach((err) =>
        expect(err).toBe(
          "ERR wrong number of arguments for 'xrevrange' command"
        )
      )
    );
  });

  it('should throw with a missing count', () => {
    const redis = new MockRedis();
    return redis
      .xrevrange('stream', '+', '-', 'COUNT')
      .catch((err) => expect(err.message).toBe('ERR syntax error'));
  });
});

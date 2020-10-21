import MockRedis from '../../src';

describe('xread', () => {
  it('reads a number of events since an id', () => {
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
    return redis
      .xread('COUNT', '2', 'STREAMS', 'stream', '2-0')
      .then((events) =>
        expect(events).toEqual([
          [
            'stream',
            [
              ['2-0', ['key', 'val']],
              ['3-0', ['key', 'val']],
            ],
          ],
        ])
      );
  });

  it('should read from multiple streams', () => {
    const redis = new MockRedis({
      data: {
        stream: [
          ['1-0', ['key', 'val']],
          ['2-0', ['key', 'val']],
          ['3-0', ['key', 'val']],
        ],
        'other-stream': [['1-0', ['key', 'val']]],
        'stream:stream:1-0': { polled: false },
        'stream:stream:2-0': { polled: false },
        'stream:stream:3-0': { polled: false },
        'stream:other-stream:1-0': { polled: false },
      },
    });
    return redis
      .xread('COUNT', '2', 'STREAMS', 'stream', '1-0', 'other-stream', '1-0')
      .then((events) =>
        expect(events).toEqual([
          [
            'stream',
            [
              ['1-0', ['key', 'val']],
              ['2-0', ['key', 'val']],
            ],
          ],
          ['other-stream', [['1-0', ['key', 'val']]]],
        ])
      );
  });

  it('should read from multiple streams with incomplete ids', () => {
    const redis = new MockRedis({
      data: {
        stream: [
          ['1-0', ['key', 'val']],
          ['2-0', ['key', 'val']],
          ['3-0', ['key', 'val']],
        ],
        'other-stream': [['1-0', ['key', 'val']]],
        'stream:stream:1-0': { polled: false },
        'stream:stream:2-0': { polled: false },
        'stream:stream:3-0': { polled: false },
        'stream:other-stream:1-0': { polled: false },
      },
    });
    return redis
      .xread('COUNT', '2', 'STREAMS', 'stream', '1', 'other-stream', '1')
      .then((events) =>
        expect(events).toEqual([
          [
            'stream',
            [
              ['1-0', ['key', 'val']],
              ['2-0', ['key', 'val']],
            ],
          ],
          ['other-stream', [['1-0', ['key', 'val']]]],
        ])
      );
  });

  it('should block reads till data becomes available', () => {
    const redis = new MockRedis();
    const op = redis
      .xread('BLOCK', '0', 'STREAMS', 'stream', '$')
      .then((row) => {
        const [[stream, [[id, values]]]] = row;
        expect(stream).toBe('stream');
        expect(id).toBe('1-0');
        expect(values).toEqual(['key', 'val']);
      });
    return redis.xadd('stream', '*', 'key', 'val').then(() => op);
  });

  it('should block reads till data becomes available since an id', () => {
    const redis = new MockRedis();
    const op = redis
      .xread('BLOCK', '0', 'STREAMS', 'stream', '2-0')
      .then((row) => {
        const [[stream, [[id, values]]]] = row;
        expect(stream).toBe('stream');
        expect(id).toBe('2-0');
        expect(values).toEqual(['key', 'val']);
      });
    return redis
      .xadd('stream', '*', 'key', 'val')
      .then(() => redis.xadd('stream', '*', 'key', 'val'))
      .then(() => op);
  });

  it('should block reads with a time out', () => {
    const redis = new MockRedis();
    return redis.xread('BLOCK', '500', 'STREAMS', 'stream', '$').then((row) => {
      expect(row).toBe(null);
    });
  });

  it('should poll all events since ID if no COUNT is given', () => {
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
    return redis.xread('STREAMS', 'stream', '2-0').then((events) =>
      expect(events).toEqual([
        [
          'stream',
          [
            ['2-0', ['key', 'val']],
            ['3-0', ['key', 'val']],
          ],
        ],
      ])
    );
  });

  it('throws if the operation is neither BLOCK or COUNT', () => {
    const redis = new MockRedis();
    return redis
      .xread('INVALID', '2', 'STREAMS', 'stream', '$')
      .catch((err) => expect(err.message).toBe('ERR syntax error'));
  });

  it('throws and error on unabalanced stream/id list', () => {
    const redis = new MockRedis();
    return redis
      .xread('BLOCK', '0', 'STREAMS', 'stream', 'other-stream', '$')
      .catch((err) =>
        expect(err.message).toBe(
          "ERR Unbalanced XREAD list of streams: for each stream key an ID or '$' must be specified."
        )
      );
  });
});

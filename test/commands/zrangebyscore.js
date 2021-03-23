import MockRedis from 'ioredis';

describe('zrangebyscore', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
  };
  it('should return using not strict compare', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('foo', 1, 3)
      .then((res) => expect(res).toEqual(['first', 'second', 'third']));
  });

  it('should return using strict compare', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('foo', '(3', 5)
      .then((res) => expect(res).toEqual(['fourth', 'fifth']));
  });

  it('should accept infinity string', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('foo', '-inf', '+inf')
      .then((res) =>
        expect(res).toEqual(['first', 'second', 'third', 'fourth', 'fifth'])
      );
  });

  it('should return empty array if out-of-range', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('foo', 10, 100)
      .then((res) => expect(res).toEqual([]));
  });

  it('should return empty array if key not found', () => {
    const redis = new MockRedis({ data });

    return redis
      .zrangebyscore('boo', 10, 100)
      .then((res) => expect(res).toEqual([]));
  });

  it('should return empty array if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .zrangebyscore('foo', 1, 2)
      .then((res) => expect(res).toEqual([]));
  });

  it('should include scores if WITHSCORES is specified', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', 1, 3, 'WITHSCORES')
      .then((res) =>
        expect(res).toEqual(['first', 1, 'second', 2, 'third', 3])
      );
  });

  it('should sort items with the same score lexicographically', () => {
    const redis = new MockRedis({
      data: {
        foo: new Map([
          ['aaa', { score: 5, value: 'aaa' }],
          ['ccc', { score: 4, value: 'ccc' }],
          ['ddd', { score: 4, value: 'ddd' }],
          ['bbb', { score: 4, value: 'bbb' }],
        ]),
      },
    });

    return redis
      .zrangebyscore('foo', '-inf', '+inf', 'WITHSCORES')
      .then((res) =>
        expect(res).toEqual(['bbb', 4, 'ccc', 4, 'ddd', 4, 'aaa', 5])
      );
  });
  it('should handle offset and limit (0,1)', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', 1, 3, 'LIMIT', 0, 1)
      .then((res) => expect(res).toEqual(['first']));
  });
  it('should handle offset and limit (1,2)', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', 1, 3, 'LIMIT', 1, 2)
      .then((res) => expect(res).toEqual(['second', 'third']));
  });
  it('should handle offset, limit, and WITHSCORES', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', 1, 3, 'WITHSCORES', 'LIMIT', 1, 1)
      .then((res) => expect(res).toEqual(['second', 2]));
  });
  it('should handle LIMIT specified before WITHSCORES', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', 1, 3, 'LIMIT', 1, 1, 'WITHSCORES')
      .then((res) => expect(res).toEqual(['second', 2]));
  });
  it('should handle LIMIT of -1', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', '-inf', '+inf', 'LIMIT', 1, -1)
      .then((res) => expect(res).toEqual(['second', 'third', 'fourth']));
  });
  it('should handle LIMIT of -1 and WITHSCORES', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', '-inf', '+inf', 'LIMIT', 1, -1, 'WITHSCORES')
      .then((res) =>
        expect(res).toEqual(['second', 2, 'third', 3, 'fourth', 4])
      );
  });
  it('should handle LIMIT of -2', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', '-inf', '+inf', 'LIMIT', 1, -2)
      .then((res) => expect(res).toEqual(['second', 'third']));
  });
  it('should handle LIMIT of 0', () => {
    const redis = new MockRedis({ data });
    return redis
      .zrangebyscore('foo', '-inf', '+inf', 'LIMIT', 1, 0)
      .then((res) => expect(res).toEqual([]));
  });
});

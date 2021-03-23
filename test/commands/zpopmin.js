import MockRedis from 'ioredis';

describe('zpopmin', () => {
  const data = {
    foo: new Map([
      ['first', { score: 1, value: 'first' }],
      ['second', { score: 2, value: 'second' }],
      ['third', { score: 3, value: 'third' }],
      ['fourth', { score: 4, value: 'fourth' }],
      ['fifth', { score: 5, value: 'fifth' }],
    ]),
  };

  it('should return first item with score', () => {
    const redis = new MockRedis({ data });

    return redis
      .zpopmin('foo')
      .then((res) => expect(res).toEqual(['first', 1]));
  });

  it('should return first N item with score if count=N', () => {
    const redis = new MockRedis({ data });

    return redis
      .zpopmin('foo', 3)
      .then((res) =>
        expect(res).toEqual(['first', 1, 'second', 2, 'third', 3])
      );
  });

  it('should return empty list if no data', () => {
    const redis = new MockRedis({ data: {} });

    return redis.zpopmin('foo').then((res) => expect(res).toEqual([]));
  });

  it('should remove the items', () => {
    const redis = new MockRedis({ data });

    return redis.zpopmin('foo', 2).then(() => {
      expect(redis.data.get('foo').has('first')).toBe(false);
      expect(redis.data.get('foo').has('second')).toBe(false);
      expect(redis.data.get('foo').has('third')).toBe(true);
    });
  });
});

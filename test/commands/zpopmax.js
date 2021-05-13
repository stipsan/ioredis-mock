import Redis from 'ioredis';

describe('zpopmax', () => {
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
    const redis = new Redis({ data });

    return redis
      .zpopmax('foo')
      .then((res) => expect(res).toEqual(['fifth', 5]));
  });

  it('should return first N item with score if count=N', () => {
    const redis = new Redis({ data });

    return redis
      .zpopmax('foo', 3)
      .then((res) =>
        expect(res).toEqual(['fifth', 5, 'fourth', 4, 'third', 3])
      );
  });

  it('should return empty list if no data', () => {
    const redis = new Redis({ data: {} });

    return redis.zpopmax('foo').then((res) => expect(res).toEqual([]));
  });

  it('should remove the items', () => {
    const redis = new Redis({ data });

    return redis.zpopmax('foo', 2).then(() => {
      expect(redis.data.get('foo').has('fifth')).toBe(false);
      expect(redis.data.get('foo').has('fourth')).toBe(false);
      expect(redis.data.get('foo').has('third')).toBe(true);
    });
  });
});

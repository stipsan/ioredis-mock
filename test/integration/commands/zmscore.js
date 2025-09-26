import Redis from 'ioredis';

describe('zmscore', () => {
  const redis = new Redis();
  afterAll(() => {
    redis.disconnect();
  });
  beforeEach(async () => {
    await redis.zadd(
      'foo',
      1,
      'first',
      2,
      'second',
      3,
      'third',
      4,
      'fourth',
      5,
      'fifth'
    );
    await redis.set('bar', 'not a sorted set');
  });

  it('should return the score of an existing member as a string', () => {
    return redis
      .zmscore('foo', 'third')
      .then((res) => expect(res).toEqual(['3']));
  });

  it('should return the scores of existing members as strings', () => {
    return redis
      .zmscore('foo', 'third', 'fourth', 'fifth')
      .then((res) => expect(res).toEqual(['3', '4', '5']));
  });

  it('should return null when the member does not exist', () => {
    return redis
      .zmscore('foo', 'sixth')
      .then((res) => expect(res).toEqual([null]));
  });

  it('should return null in place of any members that are not in the set', () => {
    return redis
      .zmscore('foo', 'fifth', 'sixth', 'seventh')
      .then((res) => expect(res).toEqual(['5', null, null]));
  });

  it('should return null when the key is not a sorted set', () => {
    return redis
      .zmscore('bar', 'first')
      .then((res) => expect(res).toEqual([null]));
  });
  it('should return nulls for all members when the key is not a sorted set', () => {
    return redis
      .zmscore('bar', 'first', 'second', 'third')
      .then((res) => expect(res).toEqual([null, null, null]));
  });

  it('should return null when the key does not exist', () => {
    return redis
      .zmscore('baz', 'first')
      .then((res) => expect(res).toEqual([null]));
  });
  it('should return nulls for all members when the key does not exist', () => {
    return redis
      .zmscore('baz', 'first', 'second', 'third')
      .then((res) => expect(res).toEqual([null, null, null]));
  });
});

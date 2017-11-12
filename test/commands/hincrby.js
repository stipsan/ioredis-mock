import expect from 'expect';

import MockRedis from '../../src';

describe('hincrby', () => {
  it('should increment an integer with passed increment in hash', () => {
    const redis = new MockRedis({
      data: {
        highscores: {
          'user:1': '9000',
        },
      },
    });

    return redis
      .hincrby('highscores', 'user:1', 100)
      .then(result => expect(result).toBe(9100))
      .then(() => expect(redis.data.get('highscores')['user:1']).toBe('9100'));
  });
  it('should create hash if not exists', () => {
    const redis = new MockRedis();

    return redis
      .hincrby('stats', 'hits', 100)
      .then(result => expect(result).toBe(100))
      .then(() => expect(redis.data.get('stats').hits).toBe('100'));
  });
  it('should create field in hash if not exists', () => {
    const redis = new MockRedis({
      data: {
        stats: {},
      },
    });

    return redis
      .hincrby('stats', 'hits', 100)
      .then(result => expect(result).toBe(100))
      .then(() => expect(redis.data.get('stats').hits).toBe('100'));
  });
  it('should decrement value in hash if negative integer is passed', () => {
    const redis = new MockRedis({
      data: {
        highscores: {
          'user:1': '9000',
        },
      },
    });

    return redis
      .hincrby('highscores', 'user:1', -100)
      .then(result => expect(result).toBe(8900))
      .then(() => expect(redis.data.get('highscores')['user:1']).toBe('8900'));
  });
});

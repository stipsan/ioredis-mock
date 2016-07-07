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

   return redis.hincrby('highscores', 'user:1', 100).then(
      highscore => expect(highscore).toBe('9100', 'over 9000!')
    );
 });
 it('should create hash if not exists', () => {
   const redis = new MockRedis();

   return redis.hincrby('stats', 'hits', 100).then(userNext => expect(userNext).toBe('100'));
 });
 it('should create field in hash if not exists', () => {
   const redis = new MockRedis({
     data: {
       stats: {},
     },
   });

   return redis.hincrby('stats', 'hits', 100).then(userNext => expect(userNext).toBe('100'));
 });
 it('should decrement value in hash if negative integer is passed', () => {
   const redis = new MockRedis({
     data: {
       highscores: {
         'user:1': '9000',
       },
     },
   });

   return redis.hincrby('highscores', 'user:1', -100).then(
      userNext => expect(userNext).toBe('8900')
    );
 });
});

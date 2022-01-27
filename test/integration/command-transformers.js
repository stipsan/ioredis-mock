import Redis from 'ioredis';
import flatten from 'lodash.flatten';

describe('transformers', () => {
  it('should support setReplyTransformer', async () => {
    const redis = new Redis();

    Redis.Command.setReplyTransformer('hgetall', result => {
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(4);

      const arr = [];
      for (let i = 0; i < result.length; i += 2) {
        arr.push([String(result[i]), String(result[i + 1])]);
      }
      return arr;
    });

    await redis.hset('replytest', 'bar', 'baz');
    await redis.hset('replytest', 'baz', 'quz');
    expect(await redis.hgetall('replytest')).toEqual([['bar', 'baz'], ['baz', 'quz']]);
    delete Redis.Command.transformers.reply.hgetall;
  });

  it('should support setArgumentTransformer', async () => {
    const redis = new Redis();

    Redis.Command.setArgumentTransformer('hmset', args => {
      if (args.length === 2) {
        if (typeof Map !== 'undefined' && args[1] instanceof Map) {
          return [args[0]].concat(flatten(Object.entries(args[1])));
        }
        if (typeof args[1] === 'object' && args[1] !== null) {
          return [args[0]].concat(flatten(Object.entries(args[1])));
        }
      }
      return args;
    })

    await redis.hmset('argtest', { k1: 'v1', k2: 'v2' });
    expect(await redis.hgetall('argtest')).toEqual({ k1: 'v1', k2: 'v2' });
    delete Redis.Command.transformers.argument.hmset;
  })
});

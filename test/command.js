import _ from 'lodash';
import Redis from 'ioredis';
import command from '../src/command';

// Ensure that we're getting the correct instance of Command when running in test:jest.js, as jest.js isn't designed to test code directly imported private functions like src/command
jest.mock('ioredis', () => {
  const { Command } = jest.requireActual('ioredis');
  const RedisMock = jest.requireActual('../src/index');

  return {
    __esModule: true,
    Command,
    default: RedisMock,
  };
});

describe('basic command', () => {
  const stub = command((...args) => args, 'testCommandName', {
    Command: { transformers: { argument: {}, reply: {} } },
  });
  it('should return a Promise that resolves the returned value', () =>
    stub('OK').then((reply) => expect(reply).toEqual(['OK'])));

  it('should support node style callbacks', () => {
    const spy = jest.fn();
    return stub(spy).then(() => expect(spy).toHaveBeenCalled());
  });

  it('should convert non-buffer arguments to strings', () => {
    const args = [Buffer.from('foo'), 'bar', 1, null, undefined];
    return stub(...args).then((reply) =>
      expect(reply).toEqual([Buffer.from('foo'), 'bar', '1', '', ''])
    );
  });

  it('should flatten args', () => {
    const args = [['foo', 'bar', 'baz']];
    return stub(...args).then((reply) =>
      expect(reply).toEqual(['foo', 'bar', 'baz'])
    );
  });

  it.todo(
    'should reject the promise if the first argument is bool false to allow simulating failures'
  );
});

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
          return [args[0]].concat(_.flatten(Object.entries(args[1])));
        }
        if (typeof args[1] === 'object' && args[1] !== null) {
          return [args[0]].concat(_.flatten(Object.entries(args[1])));
        }
      }
      return args;
    })

    await redis.hmset('argtest', { k1: 'v1', k2: 'v2' });
    expect(await redis.hgetall('argtest')).toEqual({ k1: 'v1', k2: 'v2' });
    delete Redis.Command.transformers.argument.hmset;
  })
});

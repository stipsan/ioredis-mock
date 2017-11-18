import { EventEmitter } from 'events';
import * as utils from 'ioredis/lib/utils';
import Promise from 'bluebird';
import * as commands from './commands';
import createCommand from './command';
import createData from './data';
import createExpires from './expires';
import Pipeline from './pipeline';

class RedisMock extends EventEmitter {
  constructor({ data = {} } = {}) {
    super();
    this.channels = {};
    this.batch = undefined;

    this.expires = createExpires();

    this.data = createData(this.expires, data);

    Object.keys(commands).forEach(command => {
      this[command] = createCommand(
        commands[command].bind(this),
        command,
        this
      );
    });

    process.nextTick(() => {
      this.emit('connect');
      this.emit('ready');
    });
  }
  multi(batch = []) {
    this.batch = new Pipeline(this);

    batch.forEach(([command, ...options]) => this.batch[command](...options));

    return this.batch;
  }
  pipeline() {
    this.batch = new Pipeline(this);
    return this.batch;
  }
  exec(callback) {
    if (!this.batch) {
      return Promise.reject(new Error('ERR EXEC without MULTI'));
    }
    const pipeline = this.batch;
    this.batch = undefined;
    return pipeline.exec(callback);
  }
}
RedisMock.prototype.Command = {
  transformers: {
    argument: {},
    reply: {},
  },
  setArgumentTransformer: (name, func) => {
    RedisMock.prototype.Command.transformers.argument[name] = func;
  },

  setReplyTransformer: (name, func) => {
    RedisMock.prototype.Command.transformers.reply[name] = func;
  },
};

const Command = RedisMock.prototype.Command;
Command.setArgumentTransformer('hmset', args => {
  if (args.length === 2) {
    if (typeof Map !== 'undefined' && args[1] instanceof Map) {
      return [args[0]].concat(utils.convertMapToArray(args[1]));
    }
    if (typeof args[1] === 'object' && args[1] !== null) {
      return [args[0]].concat(utils.convertObjectToArray(args[1]));
    }
  }
  return args;
});

Command.setReplyTransformer('hgetall', result => {
  if (Array.isArray(result)) {
    const obj = {};
    for (let i = 0; i < result.length; i += 2) {
      obj[result[i]] = result[i + 1];
    }
    return obj;
  }
  return result;
});

const msetArgumentTransformer = args => {
  if (args.length === 1) {
    if (typeof Map !== 'undefined' && args[0] instanceof Map) {
      return utils.convertMapToArray(args[0]);
    }
    if (typeof args[0] === 'object' && args[0] !== null) {
      return utils.convertObjectToArray(args[0]);
    }
  }
  return args;
};

Command.setArgumentTransformer('mset', msetArgumentTransformer);
Command.setArgumentTransformer('msetnx', msetArgumentTransformer);

module.exports = RedisMock;

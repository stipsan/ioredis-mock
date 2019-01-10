import { EventEmitter } from 'events';
import { Command } from 'ioredis';
import * as commands from './commands';
import * as commandsStream from './commands-stream';
import createCommand from './command';
import createData from './data';
import createExpires from './expires';
import emitConnectEvent from './commands-utils/emitConnectEvent';
import Pipeline from './pipeline';
import promiseContainer from './promise-container';

const defaultOptions = { data: {}, keyPrefix: '', lazyConnect: false };

class RedisMock extends EventEmitter {
  constructor(options = {}) {
    super();
    this.channels = new EventEmitter();
    this.batch = undefined;
    this.connected = false;

    const optionsWithDefault = Object.assign({}, defaultOptions, options);

    this.expires = createExpires(optionsWithDefault.keyPrefix);

    this.data = createData(
      this.expires,
      optionsWithDefault.data,
      optionsWithDefault.keyPrefix
    );

    Object.keys(commands).forEach(command => {
      this[command] = createCommand(
        commands[command].bind(this),
        command,
        this
      );
    });

    Object.keys(commandsStream).forEach(command => {
      this[command] = commandsStream[command].bind(this);
    });

    if (optionsWithDefault.lazyConnect === false) {
      this.connected = true;
      emitConnectEvent(this);
    }
  }

  multi(batch = []) {
    this.batch = new Pipeline(this);
    // eslint-disable-next-line no-underscore-dangle
    this.batch._transactions += 1;

    batch.forEach(([command, ...options]) => this.batch[command](...options));

    return this.batch;
  }

  pipeline(batch = []) {
    this.batch = new Pipeline(this);

    batch.forEach(([command, ...options]) => this.batch[command](...options));

    return this.batch;
  }

  exec(callback) {
    const Promise = promiseContainer.get();

    if (!this.batch) {
      return Promise.reject(new Error('ERR EXEC without MULTI'));
    }
    const pipeline = this.batch;
    this.batch = undefined;
    return pipeline.exec(callback);
  }
}
RedisMock.prototype.Command = {
  // eslint-disable-next-line no-underscore-dangle
  transformers: Command._transformer,
  setArgumentTransformer: (name, func) => {
    RedisMock.prototype.Command.transformers.argument[name] = func;
  },

  setReplyTransformer: (name, func) => {
    RedisMock.prototype.Command.transformers.reply[name] = func;
  },
};

Object.defineProperty(RedisMock, 'Promise', {
  get: () => promiseContainer.get(),
  set: lib => promiseContainer.set(lib),
});

module.exports = RedisMock;

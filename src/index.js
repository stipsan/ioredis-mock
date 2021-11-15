/* eslint-disable max-classes-per-file */
import { EventEmitter } from 'events';
import { Command } from 'ioredis';
import redisCommands from 'redis-commands';
import * as commands from './commands';
import * as commandsStream from './commands-stream';
import createCommand from './command';
import createData from './data';
import createExpires from './expires';
import emitConnectEvent from './commands-utils/emitConnectEvent';
import Pipeline from './pipeline';
import promiseContainer from './promise-container';
import parseKeyspaceEvents from './keyspace-notifications';

const defaultOptions = {
  data: {},
  keyPrefix: '',
  lazyConnect: false,
  notifyKeyspaceEvents: '', // string pattern as specified in https://redis.io/topics/notifications#configuration e.g. 'gxK'
};

class RedisMock extends EventEmitter {
  static get Promise() {
    return promiseContainer.get();
  }

  static set Promise(lib) {
    return promiseContainer.set(lib);
  }

  constructor(options = {}) {
    super();
    this.channels = new EventEmitter();
    this.patternChannels = new EventEmitter();
    this.batch = undefined;
    this.connected = false;
    this.subscriberMode = false;
    this.customCommands = {};
    // a mapping of sha1<string>:script<string>, used by evalsha command
    this.shaScripts = {};

    // eslint-disable-next-line prefer-object-spread
    const optionsWithDefault = Object.assign({}, defaultOptions, options);

    this.expires = createExpires(optionsWithDefault.keyPrefix);

    this.data = createData(
      this.expires,
      optionsWithDefault.data,
      optionsWithDefault.keyPrefix
    );

    this._initCommands();

    this.keyspaceEvents = parseKeyspaceEvents(
      optionsWithDefault.notifyKeyspaceEvents
    );

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

  createConnectedClient(options = {}) {
    const mock = new RedisMock(options);
    mock.expires =
      typeof options.keyPrefix === 'string'
        ? this.expires.withKeyPrefix(options.keyPrefix)
        : this.expires;
    mock.data =
      typeof options.keyPrefix === 'string'
        ? this.data.withKeyPrefix(options.keyPrefix)
        : this.data;
    mock.channels = this.channels;
    mock.patternChannels = this.patternChannels;
    return mock;
  }

  // eslint-disable-next-line class-methods-use-this
  disconnect() {
    const removeFrom = ({ instanceListeners }) => {
      if (!instanceListeners) {
        return;
      }

      instanceListeners.forEach((mapOfInstanceToListener) => {
        mapOfInstanceToListener.forEach((listener, instance) => {
          if (instance === this) {
            mapOfInstanceToListener.delete(instance);
          }
        });
      });
    };

    removeFrom(this.channels);
    removeFrom(this.patternChannels);
    // no-op
  }

  _initCommands() {
    Object.keys(commands).forEach((command) => {
      const commandName = command === 'evaluate' ? 'eval' : command;
      this[commandName] = createCommand(
        commands[command].bind(this),
        commandName,
        this
      );
    });

    Object.keys(commandsStream).forEach((command) => {
      this[command] = commandsStream[command].bind(this);
    });

    const supportedCommands = [
      ...redisCommands.list,
      ...redisCommands.list.map((command) => `${command}Buffer`),
    ];
    const docsLink =
      'https://github.com/stipsan/ioredis-mock/blob/master/compat.md#supported-commands-';
    supportedCommands.forEach((command) => {
      if (!(command in this)) {
        Object.defineProperty(this, command, {
          value: () => {
            throw new TypeError(
              `Unsupported command: ${JSON.stringify(
                command
              )}, please check the full list over mocked commands: ${docsLink}`
            );
          },
          writable: false,
        });
      }
    });
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

RedisMock.Cluster = class RedisClusterMock extends RedisMock {
  constructor(nodesOptions) {
    super();
    this.nodes = [];
    nodesOptions.forEach((options) => this.nodes.push(new RedisMock(options)));
  }
};

module.exports = RedisMock;

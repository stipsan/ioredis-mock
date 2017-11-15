import { EventEmitter } from 'events';
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
      this[command] = createCommand(commands[command].bind(this), command);
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

module.exports = RedisMock;

import {EventEmitter} from 'events'
import Promise from 'bluebird';

import * as commands from './commands';

import createCommand from './command';
import createData from './data';
import createExpires from './expires';

class RedisMock extends EventEmitter {
  constructor({ data = {} } = { }) {
    super();
    this.channels = {};
    this.batch = [];

    this.expires = createExpires();

    this.data = createData(this.expires, data);

    Object.keys(commands).forEach((command) => {
      this[command] = createCommand(commands[command].bind(this));
    });

    process.nextTick(() => {
      this.emit('connect');
      this.emit('ready');
    });
  }
  multi(batch) {
    this.batch = batch.map(([command, ...options]) => this[command].bind(this, ...options));

    return this;
  }
  exec(callback) {
    return Promise.all(this.batch.map(promise => promise()))
      .then(results => results.map(result => [null, result])).nodeify(callback);
  }
}

module.exports = RedisMock;

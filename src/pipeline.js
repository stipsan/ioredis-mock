import Promise from 'bluebird';

import * as commands from './commands';
import { processArguments, processReply } from './command';

class Pipeline {
  constructor(redis) {
    this.batch = [];
    this.redis = redis;
    this._transactions = 0;

    Object.keys(commands).forEach(command => {
      this[command] = this._createCommand(command);
    });
  }
  _createCommand(commandName) {
    return (...args) => {
      const commandEmulator = commands[commandName].bind(this.redis);
      const commandArgs = processArguments(args, commandName, this.redis);
      this.batch.push(() =>
        processReply(commandEmulator(...commandArgs), commandName, this.redis)
      );
      this._transactions += 1;
      return this;
    };
  }
  exec(callback) {
    // eslint-disable-next-line prefer-destructuring
    const batch = this.batch;
    this.batch = [];
    return Promise.resolve(batch.map(cmd => [null, cmd()])).asCallback(
      callback
    );
  }
}

export default Pipeline;

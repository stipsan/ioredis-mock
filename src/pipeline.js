import asCallback from 'standard-as-callback';
import * as commands from './commands';
import { processArguments, safelyExecuteCommand } from './command';
import promiseContainer from './promise-container';

class Pipeline {
  constructor(redis) {
    this.batch = [];
    this.redis = redis;
    this._transactions = 0;

    this.copyCommands();
  }

  copyCommands() {
    Object.keys(commands).forEach((commandName) => {
      const command = commands[commandName];
      this[commandName] = this._createCommand(commandName, command);
    });

    // make sure we support custom commands, too
    Object.keys(this.redis.customCommands).forEach((commandName) => {
      const command = this.redis.customCommands[commandName];
      this[commandName] = this._createCommand(commandName, command);
    });
  }

  _createCommand(commandName, command) {
    return (...args) => {
      const lastArgIndex = args.length - 1;
      let callback = args[lastArgIndex];
      if (typeof callback !== 'function') {
        callback = undefined;
      } else {
        // eslint-disable-next-line no-param-reassign
        args.length = lastArgIndex;
      }
      const commandEmulator = command.bind(this.redis);
      const commandArgs = processArguments(args, commandName);

      this._addTransaction(commandEmulator, commandName, commandArgs, callback);
      return this;
    };
  }

  _addTransaction(commandEmulator, commandName, commandArgs, callback) {
    const Promise = promiseContainer.get();
    this.batch.push(() =>
      asCallback(
        new Promise((resolve) =>
          resolve(
            safelyExecuteCommand(
              commandEmulator,
              commandName,
              this.redis,
              ...commandArgs
            )
          )
        ),
        callback
      )
    );
    this._transactions += 1;
  }

  exec(callback) {
    // eslint-disable-next-line prefer-destructuring
    const batch = this.batch;
    const Promise = promiseContainer.get();

    this.batch = [];
    return asCallback(
      Promise.all(batch.map((cmd) => cmd())).then((replies) =>
        replies.map((reply) => [null, reply])
      ),
      callback
    );
  }
}

export default Pipeline;

import Promise from 'bluebird';

import * as commands from './commands';

function createCommand(pipeline, emulate, commandName, RedisMock) {
  return (...args) => {
    const lastArgIndex = args.length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      // eslint-disable-next-line no-param-reassign
      args.length = lastArgIndex;
    }

    // transform non-buffer arguments to strings to simulate real ioredis behavior
    let commandArgs = args;
    if (RedisMock.Command.transformers.argument[commandName]) {
      commandArgs = RedisMock.Command.transformers.argument[commandName](args);
    }

    commandArgs = commandArgs.map(
      arg => (arg instanceof Buffer ? arg : arg.toString())
    );
    pipeline.batch.push(() => emulate(...commandArgs));
    return pipeline;
  };
}

class Pipeline {
  constructor(redis) {
    this.batch = [];

    Object.keys(commands).forEach(command => {
      this[command] = createCommand(
        this,
        commands[command].bind(redis),
        command,
        redis
      );
    });
  }
  exec(callback) {
    const batch = this.batch;
    this.batch = [];
    return Promise.resolve(batch.map(cmd => [null, cmd()])).asCallback(
      callback
    );
  }
}

export default Pipeline;

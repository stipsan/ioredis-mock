import Promise from 'bluebird';

import * as commands from './commands';
import { processArguments } from './command';

function createCommand(pipeline, commandEmulator, commandName, RedisMock) {
  return (...args) => {
    // transform non-buffer arguments to strings to simulate real ioredis behavior
    const commandArgs = processArguments(args, commandName, RedisMock);
    pipeline.batch.push(() => commandEmulator(...commandArgs));
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

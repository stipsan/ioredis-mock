import Promise from 'bluebird';

import * as commands from './commands';
import { processArguments, processReply } from './command';

function createCommand(pipeline, commandEmulator, commandName, RedisMock) {
  return (...args) => {
    const commandArgs = processArguments(args, commandName, RedisMock);
    pipeline.batch.push(() =>
      processReply(commandEmulator(...commandArgs), commandName, RedisMock)
    );
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
    // eslint-disable-next-line prefer-destructuring
    const batch = this.batch;
    this.batch = [];
    return Promise.resolve(batch.map(cmd => [null, cmd()])).asCallback(
      callback
    );
  }
}

export default Pipeline;

import Promise from 'bluebird';

import * as commands from './commands';

function createCommand(pipeline, emulate) {
  return (...args) => {
    const lastArgIndex = args.length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      args.length = lastArgIndex; // eslint-disable-line no-param-reassign
    }

    // transform non-buffer arguments to strings to simulate real ioredis behavior
    const stringArgs = args.map(arg => // eslint-disable-line no-confusing-arrow
      arg instanceof Buffer ? arg : arg.toString()
    );

    pipeline.batch.push(() => emulate(...stringArgs));
    return pipeline;
  };
}

class Pipeline {
  constructor(redis) {
    this.batch = [];

    Object.keys(commands).forEach((command) => {
      this[command] = createCommand(this, commands[command].bind(redis));
    });
  }
  exec(callback) {
    const batch = this.batch;
    this.batch = [];
    return Promise.resolve(batch.map(cmd => [null, cmd()])).asCallback(callback);
  }
}

export default Pipeline;

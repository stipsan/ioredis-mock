import Promise from 'bluebird';

export default function command(emulate, commandName, RedisMock) {
  return (...args) => {
    const lastArgIndex = args.length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      // eslint-disable-next-line no-param-reassign
      args.length = lastArgIndex;
    }

    let commandArgs = args;
    if (RedisMock.Command.transformers.argument[commandName]) {
      commandArgs = RedisMock.Command.transformers.argument[commandName](args);
    }
    commandArgs = commandArgs.map(
      // transform non-buffer arguments to strings to simulate real ioredis behavior
      arg => (arg instanceof Buffer ? arg : arg.toString())
    );

    return new Promise(resolve => resolve(emulate(...commandArgs))).asCallback(
      callback
    );
  };
}

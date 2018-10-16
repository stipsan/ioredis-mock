import _ from 'lodash';
import asCallback from 'standard-as-callback';
import promiseContainer from './promise-container';

export function processArguments(args, commandName, RedisMock) {
  let commandArgs = args ? _.flatten(args) : [];
  if (RedisMock.Command.transformers.argument[commandName]) {
    commandArgs = RedisMock.Command.transformers.argument[commandName](args);
  }
  commandArgs = commandArgs.map(
    // transform non-buffer arguments to strings to simulate real ioredis behavior
    arg =>
      arg instanceof Buffer || arg === null || arg === undefined
        ? arg
        : arg.toString()
  );
  return commandArgs;
}

export function processReply(result, commandName, RedisMock) {
  if (RedisMock.Command.transformers.reply[commandName]) {
    return RedisMock.Command.transformers.reply[commandName](result);
  }
  return result;
}
export default function command(commandEmulator, commandName, RedisMock) {
  return (...args) => {
    const lastArgIndex = args.length - 1;
    let callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      // eslint-disable-next-line no-param-reassign
      args.length = lastArgIndex;
    }

    const commandArgs = processArguments(args, commandName, RedisMock);
    const Promise = promiseContainer.get();

    return asCallback(
      new Promise(resolve =>
        resolve(
          processReply(commandEmulator(...commandArgs), commandName, RedisMock)
        )
      ),
      callback
    );
  };
}

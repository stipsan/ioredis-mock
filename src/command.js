import _ from 'lodash';
import asCallback from 'standard-as-callback';
import promiseContainer from './promise-container';

export function isInSubscriberMode(RedisMock) {
  if (RedisMock.channels === undefined) {
    return false;
  }
  return RedisMock.subscriberMode;
}

export function isNotConnected(RedisMock) {
  if (RedisMock.connected === undefined) {
    return false;
  }
  return !RedisMock.connected;
}

export function throwIfInSubscriberMode(commandName, RedisMock) {
  if (isInSubscriberMode(RedisMock)) {
    const allowedCommands = [
      'subscribe',
      'psubscribe',
      'unsubscribe',
      'punsubscribe',
      'ping',
      'quit',
      'disconnect',
    ];
    if (allowedCommands.indexOf(commandName) > -1) {
      // command is allowed -> do not throw
    } else {
      throw new Error(
        'Connection in subscriber mode, only subscriber commands may be used'
      );
    }
  }
}

export function throwIfNotConnected(commandName, RedisMock) {
  if (isNotConnected(RedisMock)) {
    if (commandName !== 'connect' && commandName !== 'defineCommand') {
      throw new Error(
        "Stream isn't writeable and enableOfflineQueue options is false"
      );
    }
  }
}

export function throwIfCommandIsNotAllowed(commandName, RedisMock) {
  throwIfInSubscriberMode(commandName, RedisMock);
  throwIfNotConnected(commandName, RedisMock);
}

/**
 * Transform non-buffer arguments to strings to simulate real ioredis behavior
 * @param {any} arg the argument to transform
 */
const argMapper = arg => {
  if (arg === null || arg === undefined) return '';
  return arg instanceof Buffer ? arg : arg.toString();
};

export function processArguments(args, commandName, RedisMock) {
  // fast return, the defineCommand command requires NO transformation of args
  if (commandName === 'defineCommand') return args;

  let commandArgs = args ? _.flatten(args) : [];
  if (RedisMock.Command.transformers.argument[commandName]) {
    commandArgs = RedisMock.Command.transformers.argument[commandName](args);
  }
  commandArgs = commandArgs.map(argMapper);
  return commandArgs;
}

export function processReply(result, commandName, RedisMock) {
  if (RedisMock.Command.transformers.reply[commandName]) {
    return RedisMock.Command.transformers.reply[commandName](result);
  }
  return result;
}

export function safelyExecuteCommand(
  commandEmulator,
  commandName,
  RedisMock,
  ...commandArgs
) {
  throwIfCommandIsNotAllowed(commandName, RedisMock);
  const result = commandEmulator(...commandArgs);
  return processReply(result, commandName, RedisMock);
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

    if (commandName === 'defineCommand') {
      return safelyExecuteCommand(
        commandEmulator,
        commandName,
        RedisMock,
        ...commandArgs
      );
    }

    const Promise = promiseContainer.get();

    return asCallback(
      new Promise(resolve =>
        resolve(
          safelyExecuteCommand(
            commandEmulator,
            commandName,
            RedisMock,
            ...commandArgs
          )
        )
      ),
      callback
    );
  };
}

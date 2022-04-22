import IoredisCommand from 'ioredis/built/Command'
import asCallback from 'standard-as-callback'

import promiseContainer from './promise-container'

export function isInSubscriberMode(RedisMock) {
  if (RedisMock.channels === undefined) {
    return false
  }
  return RedisMock.subscriberMode
}

export function isNotConnected(RedisMock) {
  if (RedisMock.connected === undefined) {
    return false
  }
  return !RedisMock.connected
}

export function throwIfInSubscriberMode(commandName, RedisMock) {
  if (isInSubscriberMode(RedisMock)) {
    const allowedCommands = [
      'subscribe',
      'subscribeBuffer',
      'psubscribe',
      'psubscribeBuffer',
      'unsubscribe',
      'unsubscribeBuffer',
      'punsubscribe',
      'punsubscribeBuffer',
      'ping',
      'pingBuffer',
      'quit',
      'quitBuffer',
      'disconnect',
    ]
    if (allowedCommands.indexOf(commandName) > -1) {
      // command is allowed -> do not throw
    } else {
      throw new Error(
        'Connection in subscriber mode, only subscriber commands may be used'
      )
    }
  }
}

export function throwIfNotConnected(commandName, RedisMock) {
  if (isNotConnected(RedisMock)) {
    if (commandName !== 'connect' && commandName !== 'defineCommand') {
      throw new Error(
        "Stream isn't writeable and enableOfflineQueue options is false"
      )
    }
  }
}

export function throwIfCommandIsNotAllowed(commandName, RedisMock) {
  throwIfInSubscriberMode(commandName, RedisMock)
  throwIfNotConnected(commandName, RedisMock)
}

export const Command = {
  // eslint-disable-next-line no-underscore-dangle
  transformers: IoredisCommand._transformer,
  setArgumentTransformer: (name, func) => {
    Command.transformers.argument[name] = func
  },

  setReplyTransformer: (name, func) => {
    Command.transformers.reply[name] = func
  },
}

/**
 * Transform non-buffer arguments to strings to simulate real ioredis behavior
 * @param {any} arg the argument to transform
 */
const argMapper = arg => {
  if (arg === null || arg === undefined) return ''
  return arg instanceof Buffer ? arg : arg.toString()
}

export function processArguments(args, commandName) {
  // fast return, the defineCommand command requires NO transformation of args
  if (commandName === 'defineCommand') return args

  let commandArgs = args ? [].concat(...args) : []
  if (Command.transformers.argument[commandName]) {
    commandArgs = Command.transformers.argument[commandName](args)
  }
  commandArgs = commandArgs.map(argMapper)
  return commandArgs
}

export function processReply(result, commandName) {
  if (Command.transformers.reply[commandName]) {
    // ioredis' reply transformer seems to receive a flat array of key/value
    // pairs for the hgetall command, emulate this
    let newResult = result
    if (commandName === 'hgetall') {
      newResult = [].concat(...Object.entries(result))
    }

    return Command.transformers.reply[commandName](newResult)
  }
  return result
}

export function safelyExecuteCommand(
  commandEmulator,
  commandName,
  RedisMock,
  ...commandArgs
) {
  throwIfCommandIsNotAllowed(commandName, RedisMock)
  const result = commandEmulator(...commandArgs)
  return processReply(result, commandName.replace(/Buffer$/, ''))
}

export default function command(commandEmulator, commandName, RedisMock) {
  return (...args) => {
    const lastArgIndex = args.length - 1
    let callback = args[lastArgIndex]
    if (typeof callback !== 'function') {
      callback = undefined
    } else {
      // eslint-disable-next-line no-param-reassign
      args.length = lastArgIndex
    }

    const commandArgs = processArguments(
      args,
      commandName.replace(/Buffer$/, ''),
      RedisMock
    )

    if (commandName === 'defineCommand') {
      return safelyExecuteCommand(
        commandEmulator,
        commandName,
        RedisMock,
        ...commandArgs
      )
    }

    const Promise = promiseContainer.get()

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
    )
  }
}

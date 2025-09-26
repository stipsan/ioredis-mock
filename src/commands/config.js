import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function config(_subcommand, ...args) {
  if (!_subcommand) {
    throw new Error("ERR wrong number of arguments for 'config' command")
  }

  const subcommand = _subcommand.toUpperCase()

  if (subcommand === 'HELP' && args.length === 0) {
    return [
      'CONFIG <subcommand> [<arg> [value] [opt] ...]. Subcommands are:',
      'GET <pattern>',
      '    Return parameters matching the glob-like <pattern> and their values.',
      'SET <directive> <value>',
      '    Set the configuration <directive> to <value>.',
      'RESETSTAT',
      '    Reset statistics reported by the INFO command.',
      'REWRITE',
      '    Rewrite the configuration file.',
      'HELP',
      '    Print this help.',
    ]
  }

  if (subcommand === 'GET' && args.length > 0) {
    return []
  }

  if (subcommand === 'SET' && args.length > 1) {
    throw new Error(
      `ERR Unknown option or number of arguments for CONFIG SET - '${args[0]}'`
    )
  }

  if (subcommand === 'RESETSTAT' && args.length === 0) {
    return 'OK'
  }

  if (subcommand === 'REWRITE' && args.length === 0) {
    throw new Error('ERR The server is running without a config file')
  }

  switch (subcommand) {
    case 'HELP':
    case 'GET':
    case 'SET':
    case 'RESETSTAT':
    case 'REWRITE':
      throw new Error(
        `ERR wrong number of arguments for 'config|${_subcommand.toLowerCase()}' command`
      )
    default:
      throw new Error(
        `ERR unknown subcommand '${_subcommand.toLowerCase()}'. Try CONFIG HELP.`
      )
  }
}

export function configBuffer(...args) {
  const val = config.apply(this, args)
  return convertStringToBuffer(val)
}

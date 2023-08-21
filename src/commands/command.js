import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export async function command(_subcommand, ...args) {
  if (!_subcommand) {
    const json = await import('../../data/command-info.json')
    return json.default || json
  }

  const subcommand = _subcommand.toUpperCase()

  if (subcommand === 'HELP' && args.length === 0) {
    return [
      'COMMAND <subcommand> [<arg> [value] [opt] ...]. Subcommands are:',
      '(no subcommand)',
      '    Return details about all Redis commands.',
      'COUNT',
      '    Return the total number of commands in this Redis server.',
      'LIST',
      '    Return a list of all commands in this Redis server.',
      'INFO [<command-name> ...]',
      '    Return details about multiple Redis commands.',
      '    If no command names are given, documentation details for all',
      '    commands are returned.',
      'DOCS [<command-name> ...]',
      '    Return documentation details about multiple Redis commands.',
      '    If no command names are given, documentation details for all',
      '    commands are returned.',
      'GETKEYS <full-command>',
      '    Return the keys from a full Redis command.',
      'GETKEYSANDFLAGS <full-command>',
      '    Return the keys and the access flags from a full Redis command.',
      'HELP',
      '    Print this help.',
    ]
  }

  if (subcommand === 'COUNT' && args.length === 0) {
    const { count } = await import('../../data/command-list.json')
    return count
  }

  if (subcommand === 'LIST') {
    if (args.length > 0) {
      throw new Error('ERR syntax error')
    }

    const { list } = await import('../../data/command-list.json')
    return list
  }

  if (subcommand === 'INFO') {
    const json = await import('../../data/command-info.json')
    const data = json.default || json
    const result =
      args.length > 0 ? data.filter(item => args.includes(item[0])) : data
    return result.length === 0 ? [null] : result
  }

  if (subcommand === 'DOCS') {
    const json = await import('../../data/command-docs.json')
    const data = json.default || json

    if (args.length === 0) {
      return data
    }

    const result = []
    for (const arg of args) {
      const index = data.indexOf(arg)
      if (index !== -1) {
        result.push(arg, data[index + 1])
      }
    }
    return result
  }

  if (subcommand === 'GETKEYS' && args.length >= 2) {
    const { getKeyIndexes, exists } = await import('@ioredis/commands')
    const [cmd, ...subArgs] = args
    if (!exists(cmd)) {
      throw new Error('ERR wrong number of arguments for \'command|getkeys\' command')
    }

    return getKeyIndexes(cmd, subArgs).map(i => subArgs[i])
  }

  if (args.length > 0) {
    throw new Error(
      `ERR wrong number of arguments for 'command|${_subcommand.toLowerCase()}' command`
    )
  }

  throw new Error(`ERR unknown subcommand '${_subcommand}'. Try COMMAND HELP.`)
}

export async function commandBuffer(...args) {
  const val = await command.apply(this, args)
  return convertStringToBuffer(val)
}

import commandsJson from 'redis-commands/commands.json'

const commandsList = Object.keys(commandsJson).reduce((acc, key) => {
  const item = commandsJson[key]
  acc.push([
    key,
    item.arity,
    item.flags,
    item.keyStart,
    item.keyStop,
    item.step,
  ])
  return acc
}, [])

export function command(_subcommand, ...args) {
  if (!_subcommand) {
    return commandsList
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
      '    Prints this help.',
    ]
  }
  if(subcommand === 'HELP' && args.length > 0) {
    throw new Error(
      `ERR wrong number of arguments for 'command|${_subcommand.toLowerCase()}' command`
    )
  }

  if (subcommand === 'COUNT' && args.length === 0) {
    return commandsList.length
  }

  if (subcommand === 'INFO') {
    const result = args.length > 0 ? commandsList.filter(item => args.includes(item[0])) : commandsList
    return result.length === 0 ? [null] : result
  }

  throw new Error(
    `ERR unknown subcommand '${_subcommand}'. Try COMMAND HELP.`
  )
}

export function commandBuffer(...args) {
  const val = command.apply(this, args)
  if (Array.isArray(val) && Array.isArray(val[0])) {
    return val.map(([name, arity, flags, keyStart, keyStop, step]) => [
      Buffer.from(name),
      arity,
      flags.map(Buffer.from),
      keyStart,
      keyStop,
      step,
    ])
  }
  if (Array.isArray(val)) {
    return val.map(v => v !== null ? Buffer.from(v) : v)
  }
  return !val || Number.isInteger(val) ? val : Buffer.from(val)
}

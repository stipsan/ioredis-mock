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
      'GETKEYS <full-command>',
      '    Return the keys from a full Redis command.',
      'INFO [<command-name> ...]',
      '    Return details about multiple Redis commands.',
      'HELP',
      '    Prints this help.',
    ]
  }

  if (subcommand === 'COUNT' && args.length === 0) {
    return commandsList.length
  }

  if (subcommand === 'INFO' && args.length > 0) {
    return commandsList.filter(item => args.includes(item[0]))
  }

  throw new Error(
    `ERR Unknown subcommand or wrong number of arguments for '${_subcommand}'. Try COMMAND HELP.`
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
    return val.map(Buffer.from)
  }
  return !val || Number.isInteger(val) ? val : Buffer.from(val)
}

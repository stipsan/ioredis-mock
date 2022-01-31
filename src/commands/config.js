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
      '    Prints this help.',
    ]
  }

  if (subcommand === 'GET' && args.length > 0) {
    return []
  }

  if (subcommand === 'SET' && args.length > 1) {
    throw new Error(`ERR Unsupported CONFIG parameter: ${args[0]}`)
  }

  if (subcommand === 'RESETSTAT' && args.length === 0) {
    return 'OK'
  }

  if (subcommand === 'REWRITE' && args.length === 0) {
    throw new Error('ERR The server is running without a config file')
  }

  throw new Error(
    `ERR Unknown subcommand or wrong number of arguments for '${_subcommand}'. Try CONFIG HELP.`
  )
}

export function configBuffer(...args) {
  const val = config.apply(this, args)
  if (Array.isArray(val)) {
    return val.map(payload => (payload ? Buffer.from(payload) : payload))
  }
  return val ? Buffer.from(val) : val
}

import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

function encoding(key) {
  const val = this.data.get(key)

  if (val instanceof Set) {
    if ([...val].every(n => n === parseInt(n, 10).toString())) {
      return 'intset'
    }
    return 'hashtable'
  }

  if (val instanceof Map) {
    return 'listpack'
  }

  if (Array.isArray(val)) {
    return 'quicklist'
  }

  if (typeof val.valueOf() === 'string') {
    if (val === parseInt(val, 10).toString()) {
      return 'int'
    }
    return 'embstr'
  }

  return 'listpack'
}

export function object(_subcommand, key, ...args) {
  if (!_subcommand) {
    throw new Error("ERR wrong number of arguments for 'object' command")
  }

  const subcommand = _subcommand.toUpperCase()
  if (subcommand === 'HELP' && !key) {
    return [
      'OBJECT <subcommand> [<arg> [value] [opt] ...]. Subcommands are:',
      'ENCODING <key>',
      '    Return the kind of internal representation used in order to store the value',
      '    associated with a <key>.',
      'FREQ <key>',
      '    Return the access frequency index of the <key>. The returned integer is',
      '    proportional to the logarithm of the recent access frequency of the key.',
      'IDLETIME <key>',
      '    Return the idle time of the <key>, that is the approximated number of',
      '    seconds elapsed since the last access to the key.',
      'REFCOUNT <key>',
      '    Return the number of references of the value associated with the specified',
      '    <key>.',
      'HELP',
      '    Prints this help.',
    ]
  }

  if (!key || args.length > 0) {
    switch (subcommand) {
      case 'REFCOUNT':
      case 'IDLETIME':
      case 'HELP':
      case 'FREQ':
      case 'ENCODING':
        throw new Error(
          `ERR wrong number of arguments for 'object|${_subcommand.toLowerCase()}' command`
        )
      default:
        throw new Error(
          `ERR unknown subcommand '${_subcommand.toLowerCase()}'. Try OBJECT HELP.`
        )
    }
  }

  if (subcommand !== 'HELP' && !this.data.has(key)) {
    return null
  }

  switch (subcommand) {
    case 'ENCODING':
      return encoding.call(this, key)
    case 'FREQ':
      throw new Error(
        'ERR An LFU maxmemory policy is not selected, access frequency not tracked. Please note that when switching between policies at runtime LRU and LFU data will take some time to adjust.'
      )
    case 'HELP':
      throw new Error(
        `ERR wrong number of arguments for 'object|${_subcommand.toLowerCase()}' command`
      )
    case 'IDLETIME':
      // @TODO implement this functionality together with the TOUCH command
      return 0
    case 'REFCOUNT':
      return 1
    default:
      throw new Error(
        `ERR unknown subcommand '${_subcommand.toLowerCase()}'. Try OBJECT HELP.`
      )
  }
}

export function objectBuffer(...args) {
  const val = object.apply(this, args)
  return convertStringToBuffer(val)
}

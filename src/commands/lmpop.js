import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function lmpop(numKeys, ...args) {
  // Validate minimum arguments
  if (arguments.length < 3) {
    throw new Error('ERR wrong number of arguments for \'lmpop\' command')
  }

  const numKeysInt = parseInt(numKeys, 10)
  
  if (Number.isNaN(numKeysInt) || numKeysInt < 1) {
    throw new Error('ERR numkeys should be greater than 0')
  }

  if (args.length < numKeysInt + 1) {
    throw new Error('ERR wrong number of arguments for \'lmpop\' command')
  }

  const keys = args.slice(0, numKeysInt)
  const direction = args[numKeysInt]
  
  if (direction !== 'LEFT' && direction !== 'RIGHT') {
    throw new Error('ERR syntax error')
  }

  let count = 1
  const remainingArgs = args.slice(numKeysInt + 1)
  
  // Parse optional COUNT argument
  if (remainingArgs.length >= 2 && remainingArgs[0].toUpperCase() === 'COUNT') {
    count = parseInt(remainingArgs[1], 10)
    if (Number.isNaN(count) || count < 1) {
      throw new Error('ERR count should be greater than 0')
    }
  } else if (remainingArgs.length > 0) {
    throw new Error('ERR syntax error')
  }

  // Try each key in order until we find a non-empty list
  for (const key of keys) {
    if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
      throw new Error('WRONGTYPE Operation against a key holding the wrong kind of value')
    }

    const list = this.data.get(key)
    if (!list || list.length === 0) {
      continue
    }

    // Found a non-empty list, pop elements from it
    const actualCount = Math.min(count, list.length)
    let items = []

    if (direction === 'LEFT') {
      items = list.splice(0, actualCount)
    } else {
      items = list.splice(-actualCount, actualCount)
      items.reverse() // RPOP returns elements in reverse order
    }

    // Clean up empty list
    if (list.length === 0) {
      this.data.delete(key)
    } else {
      this.data.set(key, list)
    }

    return [key, items]
  }

  // All lists are empty or non-existent
  return null
}

export function lmpopBuffer(...args) {
  const val = lmpop.apply(this, args)
  return convertStringToBuffer(val)
}
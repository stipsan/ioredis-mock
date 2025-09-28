import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function lmpop(...args) {
  // LMPOP numkeys key [key ...] LEFT|RIGHT [COUNT count]
  
  if (args.length < 3) {
    throw new Error('ERR wrong number of arguments for \'lmpop\' command')
  }
  
  const numKeys = parseInt(args[0], 10)
  
  if (Number.isNaN(numKeys) || numKeys < 1) {
    throw new Error('ERR numkeys should be greater than 0')
  }
  
  if (args.length < numKeys + 2) {
    throw new Error('ERR wrong number of arguments for \'lmpop\' command')
  }
  
  const keys = args.slice(1, numKeys + 1)
  const direction = args[numKeys + 1]?.toLowerCase()
  
  if (direction !== 'left' && direction !== 'right') {
    throw new Error('ERR syntax error')
  }
  
  let count = 1
  const remainingArgs = args.slice(numKeys + 2)
  
  // Parse optional COUNT argument
  if (remainingArgs.length > 0) {
    if (remainingArgs[0]?.toLowerCase() === 'count') {
      if (remainingArgs.length < 2) {
        throw new Error('ERR syntax error')
      }
      const parsedCount = parseInt(remainingArgs[1], 10)
      if (Number.isNaN(parsedCount) || parsedCount < 1) {
        throw new Error('ERR count should be greater than 0')
      }
      count = parsedCount
      
      if (remainingArgs.length > 2) {
        throw new Error('ERR syntax error')
      }
    } else {
      throw new Error('ERR syntax error')
    }
  }
  
  // Find the first non-empty list
  for (const key of keys) {
    if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
      throw new Error(
        'WRONGTYPE Operation against a key holding the wrong kind of value'
      )
    }
    
    const list = this.data.get(key) || []
    
    if (list.length > 0) {
      // Pop elements from this list
      const actualCount = Math.min(count, list.length)
      const result = []
      
      for (let i = 0; i < actualCount; i++) {
        if (direction === 'left') {
          result.push(list.shift())
        } else {
          result.push(list.pop())
        }
      }
      
      // Update the list in storage
      if (list.length > 0) {
        this.data.set(key, list)
      } else {
        this.data.delete(key)
      }
      
      // Return [key, elements] format
      return [key, result]
    }
  }
  
  // All lists were empty
  return null
}

export function lmpopBuffer(...args) {
  const val = lmpop.apply(this, args)
  return convertStringToBuffer(val)
}
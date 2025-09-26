import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function lpos(key, element, ...args) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`)
  }
  
  const list = this.data.get(key) || []
  
  // Parse optional arguments
  let rank = 1
  let count = null
  let maxlen = null
  
  for (let i = 0; i < args.length; i += 2) {
    const option = args[i]?.toUpperCase()
    const value = args[i + 1]
    
    if (option === 'RANK') {
      rank = parseInt(value, 10)
      if (isNaN(rank) || rank === 0) {
        throw new Error('ERR RANK can\'t be zero: use 1 to start from the first match, 2 from the second ... or use negative to start from the end of the list')
      }
    } else if (option === 'COUNT') {
      count = parseInt(value, 10)
      if (isNaN(count) || count < 0) {
        throw new Error('ERR COUNT can\'t be negative')
      }
    } else if (option === 'MAXLEN') {
      maxlen = parseInt(value, 10)
      if (isNaN(maxlen) || maxlen < 0) {
        throw new Error('ERR MAXLEN can\'t be negative')
      }
    }
  }
  
  // Find positions of matching elements
  const positions = []
  const searchLimit = maxlen !== null ? Math.min(maxlen, list.length) : list.length
  
  for (let i = 0; i < searchLimit; i++) {
    if (list[i] === element) {
      positions.push(i)
    }
  }
  
  if (positions.length === 0) {
    return count !== null ? [] : null
  }
  
  // Handle RANK parameter
  let targetPositions
  if (rank > 0) {
    // Positive rank: 1st, 2nd, 3rd occurrence from start
    if (rank > positions.length) {
      return count !== null ? [] : null
    }
    targetPositions = positions.slice(rank - 1)
  } else {
    // Negative rank: 1st, 2nd, 3rd occurrence from end
    if (Math.abs(rank) > positions.length) {
      return count !== null ? [] : null
    }
    targetPositions = positions.slice(rank)
  }
  
  // Handle COUNT parameter
  if (count !== null) {
    if (count === 0) {
      return targetPositions
    }
    return targetPositions.slice(0, count)
  }
  
  // Return single position
  return targetPositions.length > 0 ? targetPositions[0] : null
}

export function lposBuffer(...args) {
  const val = lpos.apply(this, args)
  return convertStringToBuffer(val)
}
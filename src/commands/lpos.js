import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function lpos(key, element, ...args) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`)
  }
  
  const list = this.data.get(key) || []
  
  // Parse optional arguments
  let rank = 1 // default: first occurrence
  let count = null // default: return single index
  let maxlen = list.length // default: search entire list
  
  for (let i = 0; i < args.length; i++) {
    const arg = String(args[i]).toUpperCase()
    
    if (arg === 'RANK' && i + 1 < args.length) {
      rank = parseInt(args[i + 1], 10)
      if (rank === 0) {
        throw new Error('ERR RANK can not be zero: use 1 to start from the first match, 2 from the second ... or use negative to start from the end of the list')
      }
      i++ // skip the rank value
    } else if (arg === 'COUNT' && i + 1 < args.length) {
      count = parseInt(args[i + 1], 10)
      if (count < 0) {
        throw new Error('ERR COUNT can not be negative')
      }
      i++ // skip the count value
    } else if (arg === 'MAXLEN' && i + 1 < args.length) {
      maxlen = parseInt(args[i + 1], 10)
      if (maxlen < 0) {
        throw new Error('ERR MAXLEN can not be negative')
      }
      i++ // skip the maxlen value
    }
  }
  
  // Search for the element
  const matches = []
  const searchLength = Math.min(maxlen, list.length)
  
  for (let i = 0; i < searchLength; i++) {
    if (list[i] === element) {
      matches.push(i)
    }
  }
  
  if (matches.length === 0) {
    return count !== null ? [] : null
  }
  
  // Handle RANK selection
  let selectedMatches
  if (rank > 0) {
    // Positive rank: 1st, 2nd, etc.
    if (rank > matches.length) {
      return count !== null ? [] : null
    }
    selectedMatches = matches.slice(rank - 1)
  } else {
    // Negative rank: last, 2nd to last, etc.
    const absRank = Math.abs(rank)
    if (absRank > matches.length) {
      return count !== null ? [] : null
    }
    selectedMatches = matches.slice(0, matches.length - absRank + 1).reverse()
  }
  
  // Handle COUNT
  if (count !== null) {
    // COUNT 0 means return all matches, not zero matches
    return count === 0 ? selectedMatches : selectedMatches.slice(0, count)
  } else {
    return selectedMatches.length > 0 ? selectedMatches[0] : null
  }
}

export function lposBuffer(...args) {
  const val = lpos.apply(this, args)
  return convertStringToBuffer(val)
}
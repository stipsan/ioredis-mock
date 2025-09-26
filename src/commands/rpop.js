import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function rpop(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`)
  }
  const list = this.data.get(key) || []

  // Handle case when list is empty
  if (list.length === 0) {
    return null
  }

  // Handle count parameter
  if (count === undefined) {
    // Single element case (original behavior)
    const item = list.pop()
    this.data.set(key, list)
    return item
  }

  // Multiple elements case
  const numCount = parseInt(count, 10)
  if (Number.isNaN(numCount) || numCount < 0) {
    throw new Error('ERR value is not an integer or out of range')
  }

  if (numCount === 0) {
    return null
  }

  const itemsToReturn = Math.min(numCount, list.length)
  const result = list.splice(-itemsToReturn, itemsToReturn)

  this.data.set(key, list)

  return result
}

export function rpopBuffer(...args) {
  const val = rpop.apply(this, args)
  return convertStringToBuffer(val)
}

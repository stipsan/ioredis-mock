import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { emitNotification } from '../keyspace-notifications'

export function copy(source, destination, ...options) {
  // Check if source key exists
  if (!this.data.has(source)) {
    return 0
  }

  // Parse options
  let replace = false
  let destinationDb = null
  
  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    if (option === 'REPLACE') {
      replace = true
    } else if (option === 'DB') {
      // Get the next argument as the DB number
      destinationDb = options[i + 1]
      i++ // Skip the next argument since we consumed it
    }
  }

  // Handle same source and destination
  if (source === destination) {
    return replace ? 1 : 0
  }

  // Check if destination exists and REPLACE not specified
  if (this.data.has(destination) && !replace) {
    return 0
  }

  // Get the source value - use deep copy to avoid reference sharing
  const value = this.data.get(source)
  let copiedValue = value

  if (Array.isArray(value)) {
    copiedValue = value.slice()
  } else if (Buffer.isBuffer(value)) {
    copiedValue = Buffer.from(value)
  } else if (value instanceof Set) {
    copiedValue = new Set(value)
  } else if (value instanceof Map) {
    copiedValue = new Map(value)
  } else if (typeof value === 'object' && value !== null) {
    copiedValue = { ...value }
  }

  // Set the destination value
  this.data.set(destination, copiedValue)

  // Copy TTL if it exists
  if (this.expires.has(source)) {
    const expire = this.expires.get(source)
    this.expires.set(destination, expire)
  }

  // Emit keyspace notifications
  emitNotification(this, 'g', destination, 'copy_to')

  return 1
}

export function copyBuffer(...args) {
  const val = copy.apply(this, args)
  return convertStringToBuffer(val)
}

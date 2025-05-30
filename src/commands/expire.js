import { emitNotification } from '../keyspace-notifications'

export function expire(key, seconds) {
  if (!Number.isInteger(seconds) || seconds < 0) {
    throw new Error('ERR value is not an integer or out of range')
  }

  if (!this.data.has(key)) {
    return 0
  }

  this.expires.set(key, seconds * 1000 + Date.now())
  emitNotification(this, 'g', key, 'expire')

  return 1
}

export const expireBuffer = expire

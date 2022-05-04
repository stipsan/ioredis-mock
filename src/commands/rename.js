import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { emitNotification } from '../keyspace-notifications'

export function rename(key, newKey) {
  const value = this.data.get(key)

  if (this.expires.has(key)) {
    const expire = this.expires.get(key)
    this.expires.delete(key)
    this.expires.set(newKey, expire)
  }

  this.data.set(newKey, value)
  this.data.delete(key)
  emitNotification(this, 'g', key, 'rename_from')
  emitNotification(this, 'g', newKey, 'rename_to')
  return 'OK'
}

export function renameBuffer(...args) {
  const val = rename.apply(this, args)
  return convertStringToBuffer(val)
}

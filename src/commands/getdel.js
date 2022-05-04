import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { type } from './index'

export function getdel(key) {
  if (!this.data.has(key)) {
    return null
  }

  if (type.call(this, key) !== 'string') {
    throw new Error(
      'WRONGTYPE Operation against a key holding the wrong kind of value'
    )
  }

  const val = this.data.get(key)
  this.data.delete(key)
  this.expires.delete(key)
  return val
}

export function getdelBuffer(...args) {
  const val = getdel.apply(this, args)
  return convertStringToBuffer(val)
}

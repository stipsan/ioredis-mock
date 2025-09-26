import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function mget(...keys) {
  if (keys.length === 0) {
    throw new Error("ERR wrong number of arguments for 'mget' command")
  }
  return keys.map(key => (this.data.has(key) ? this.data.get(key) : null))
}

export function mgetBuffer(...args) {
  const val = mget.apply(this, args)
  return convertStringToBuffer(val)
}

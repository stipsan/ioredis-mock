import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function get(key) {
  const value = this.data.has(key) ? this.data.get(key) : null

  if (Buffer.isBuffer(value)) {
    return value.toString()
  }

  return value
}

export function getBuffer(key) {
  return this.data.has(key) ? convertStringToBuffer(this.data.get(key)) : null
}

import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function hkeys(key) {
  return this.data.has(key) ? Object.keys(this.data.get(key)) : []
}

export function hkeysBuffer(globString) {
  const val = hkeys.call(this, globString)
  return convertStringToBuffer(val)
}

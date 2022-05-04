import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function hvals(key) {
  if (!this.data.has(key)) {
    return []
  }

  return Object.values(this.data.get(key))
}

export function hvalsBuffer(key) {
  const val = hvals.call(this, key)
  return convertStringToBuffer(val)
}

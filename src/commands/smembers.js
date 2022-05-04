import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function smembers(key) {
  if (!this.data.has(key)) {
    return []
  }

  return Array.from(this.data.get(key))
}

export function smembersBuffer(...args) {
  const val = smembers.apply(this, args)
  return convertStringToBuffer(val)
}

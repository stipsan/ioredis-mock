import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function hget(key, hashKey) {
  const hash = this.data.get(key)

  if (!hash || hash[hashKey] === undefined) {
    return null
  }

  return hash[hashKey]
}

export function hgetBuffer(key, hashKey) {
  const val = hget.apply(this, [key, hashKey])
  return convertStringToBuffer(val)
}

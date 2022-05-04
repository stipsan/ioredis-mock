import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function hmget(key, ...fields) {
  const hash = this.data.get(key)
  return fields.map(field => {
    if (!hash || hash[field] === undefined) {
      return null
    }
    return hash[field]
  })
}

export function hmgetBuffer(...args) {
  const val = hmget.apply(this, args)
  return convertStringToBuffer(val)
}

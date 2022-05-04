import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function getrange(key, s, e) {
  const val = this.data.get(key)
  const start = parseInt(s, 10)
  const end = parseInt(e, 10)

  if (end === -1) {
    return val.slice(start)
  }

  return val.slice(start, end + 1)
}

export function getrangeBuffer(...args) {
  const val = getrange.apply(this, args)
  return convertStringToBuffer(val)
}

// SUBSTR is deprecated as of Redis 2.0, but as it's unlikely it'll be completely removed we support it
export const substr = getrange
export const substrBuffer = getrangeBuffer

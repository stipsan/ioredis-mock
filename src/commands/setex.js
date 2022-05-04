import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { expire, set } from './index'

export function setex(key, seconds, value) {
  set.call(this, key, value)

  expire.call(this, key, seconds)

  return 'OK'
}

export function setexBuffer(...args) {
  const val = setex.apply(this, args)
  return convertStringToBuffer(val)
}

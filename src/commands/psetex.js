import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { pexpire, set } from './index'

export function psetex(key, milliseconds, value) {
  set.call(this, key, value)

  pexpire.call(this, key, milliseconds)

  return 'OK'
}

export function psetexBuffer(...args) {
  const val = psetex.apply(this, args)
  return convertStringToBuffer(val)
}

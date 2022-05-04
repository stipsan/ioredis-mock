import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function replconf() {
  return 'OK'
}

export function replconfBuffer() {
  const val = replconf.call(this)
  return convertStringToBuffer(val)
}

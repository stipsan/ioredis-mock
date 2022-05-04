import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function readwrite() {
  return 'OK'
}

export function readwriteBuffer() {
  const val = readwrite.call(this)
  return convertStringToBuffer(val)
}

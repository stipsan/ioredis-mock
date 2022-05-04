import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function flushdb() {
  this.flushall()
  return 'OK'
}

export function flushdbBuffer() {
  const val = flushdb.call(this)
  return convertStringToBuffer(val)
}

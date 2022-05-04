import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function flushall() {
  this.expires.clear()
  this.data.clear()

  return 'OK'
}

export function flushallBuffer() {
  const val = flushall.call(this)
  return convertStringToBuffer(val)
}

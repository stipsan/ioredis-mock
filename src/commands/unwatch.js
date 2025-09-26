import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function unwatch() {
  this.dirty = false
  this.watching.clear()
  return 'OK'
}

export function unwatchBuffer() {
  const val = unwatch.call(this)
  return convertStringToBuffer(val)
}

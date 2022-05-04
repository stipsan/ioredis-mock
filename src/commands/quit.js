import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function quit() {
  this.disconnect()
  return 'OK'
}

export function quitBuffer() {
  const val = quit.call(this)
  return convertStringToBuffer(val)
}

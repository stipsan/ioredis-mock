import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function readonly() {
  throw new Error('ERR This instance has cluster support disabled')
}

export function readonlyBuffer() {
  const val = readonly.call(this)
  return convertStringToBuffer(val)
}

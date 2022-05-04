import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function save() {
  return 'OK'
}

export function saveBuffer() {
  const val = save.call(this)
  return convertStringToBuffer(val)
}

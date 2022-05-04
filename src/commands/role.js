import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function role() {
  return ['master', 0]
}

export function roleBuffer() {
  const val = role.call(this)
  return convertStringToBuffer(val)
}
